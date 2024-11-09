import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import Cookies from 'js-cookie';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5555', 'http://localhost:4000', 'http://localhost:8989'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(cookieParser());
app.use(express.json());
const gameData = {};

app.set('gameData', gameData);


io.on('connection', (socket) => {
  socket.user = socket.handshake.query.userName;
  gameData[socket.user] = socket.id;
  socket.join(socket.user);
  console.log('Client connected to the game server', socket.user);

    
  socket.on('invite', (sender, receiver) => {
    console.log('Invite sent from', sender, 'to', receiver);
    if (gameData[receiver]) {
      socket.to(gameData[receiver]).emit('Receive', sender, receiver);
      console.log('Invite sent from', sender, 'at', gameData[sender], 'to', receiver, 'at', gameData[receiver]);
      socket.join(receiver);
    } else {
      console.log('Receiver not found in gameData');
    }
  });

  socket.on('answer', (receiver, sender, senderId, answer) => {
    console.log('Invite answer from', receiver, 'is', answer);
    if(answer){
      io.emit('start game', receiver, sender, senderId);
    }
    io.emit('declined game', receiver, answer);
  });

  socket.on('disconnect', () => {
    console.log( socket.user,'disconnected from the game server');
  });



});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Game server is running on port ${PORT}`));
