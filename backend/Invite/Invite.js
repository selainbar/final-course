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


 

