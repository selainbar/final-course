import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:9000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:9000'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(cookieParser());
app.use(express.json());

const gameData = {};
const rooms = {}; // Move rooms outside to ensure it’s globally accessible

app.set('gameData', gameData);

io.on('connection', (socket) => {
  // Associate user and socket ID in gameData
  const userName = socket.handshake.query.userName;
  socket.user = userName;
  gameData[userName] = socket.id;
  console.log('Client connected to the game server', userName);

  // Handle game invitation
  socket.on('invite', (sender, receiver) => {
    console.log('Invite sent from', sender, 'to', receiver);
    if (gameData[receiver]) {
      socket.to(gameData[receiver]).emit('Receive', sender, receiver);
    } else {
      console.log('Receiver not found in gameData');
    }
  });

  socket.on('answer', (receiver, sender, answer) => {
    console.log('Invite answer from', receiver, 'is', answer);
    if (answer) {
      io.to([gameData[sender], gameData[receiver]]).emit('start game', receiver, sender, answer);
    } else {
      io.to(gameData[sender]).emit('declined game', receiver, answer);
    }
  });
// Join or create a game room based on opponent's name
socket.on('joinGame', (opponentName) => {
   const roomName = `room_${[userName, opponentName].sort().join('_')}`; 
   socket.join(roomName);
    console.log(`${userName} joined ${roomName}`); 
    // Initialize room data if not present
     if (!rooms[roomName]) { rooms[roomName] = {
       players: [userName], gameState: initializeGameState(), turn: 'White', 
       // Default turn
        }; } else if (!rooms[roomName].players.includes(userName)) {
           rooms[roomName].players.push(userName);
           } 
           // Start the game if both players have joined
            if (rooms[roomName].players.length === 2) { 
              io.to(roomName).emit('gameStart', `Game started between ${userName} and ${opponentName}`);
               io.to(roomName).emit('gameState', rooms[roomName].gameState); } });
                // Handle dice rolls, validate turn, and broadcast updated state
                 socket.on('rollDice', ({ userName, diceValues }) => {
                   const playerRoom = Object.keys(socket.rooms).find(r => r.startsWith('room_')); 
                   if (!playerRoom || rooms[playerRoom].turn !== userName) { 
                    socket.emit('error', "It's not your turn."); 
                    return; 
                  } 
                  // Update game state
                   rooms[playerRoom].gameState.diceValues = diceValues; 
                   rooms[playerRoom].turn = rooms[playerRoom].turn === 'White' ? 'Black' : 'White'; 
                   // Broadcast updated game state to all players in the room
                    io.to(playerRoom).emit('gameState', rooms[playerRoom].gameState); });
                     // Handle game state updates from players (like making a move)
                      socket.on('updateGameState', (newState) => { 
                        const playerRoom = Object.keys(socket.rooms).find(r => r.startsWith('room_'));
                         if (playerRoom && rooms[playerRoom]) {
                           rooms[playerRoom].gameState = newState;
                            socket.to(playerRoom).emit('gameState', newState);
                           }
                            else {
                               console.error(`Game room ${playerRoom} not found`);
                               } }); 
                               // Manage player disconnection and room cleanup
                                socket.on('disconnect', () => {
                                   console.log(`${userName} disconnected`); 
                                   const playerRoom = Object.keys(socket.rooms).find(r => r.startsWith('room_')); if (playerRoom && rooms[playerRoom]) { rooms[playerRoom].players = rooms[playerRoom].players.filter(p => p !== userName); io.to(playerRoom).emit('playerDisconnected', userName); 
                                    // Delete room if empty 
                                    if (rooms[playerRoom].players.length === 0) 
                                      { 
                                        delete rooms[playerRoom];
                                       } }
                                        delete gameData[userName];
                                       }); });

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Game server is running on port ${PORT}`));

// Function to initialize game state
function initializeGameState() {
  return {
    // Define your initial game state here, e.g.,
    turn: 'White',
    board: [/* initial board configuration */],
  };
}
