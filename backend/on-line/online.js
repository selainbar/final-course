import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingInterval: 25000, 
  pingTimeout: 6000000,
});

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(cookieParser());
app.use(express.json());

class Player {
  static onlinePlayers = [];

  static getOnlinePlayers() {
    return Player.onlinePlayers;
  }

  constructor({ userName, status, gameSocketId }) {
    this.userName = userName;
    this.status = status;
    this.gameSocketId = gameSocketId;
  }
}

io.on('connection', (socket) => {
  console.log('Client connected to the online server');


  socket.on('connected', (user) => {
    try {
      console.log('User connected:', user,'!!!!!!!!!!!!!!!!!!!!');
      socket.userName = user.userName;
      const player = new Player({ userName: user.userName, status: 'online', gameSocketId: user.gameSocketId });
      if (!Player.onlinePlayers.some(player => player.userName === user.userName)) {
        Player.onlinePlayers.push(player);
        console.log(Player.onlinePlayers);
      }
      io.emit('statusChange', Player.onlinePlayers);
    } catch (error) {
      console.error('Error handling connected event:', error);
    }
  });

socket.on('changingStatus', (user) => {
    try {
      console.log('User changing status:', user);
      const playerIndex = Player.onlinePlayers.findIndex(player => player.userName === user.userName);
        Player.onlinePlayers[playerIndex].status = user.status;
        io.emit('statusChange', Player.onlinePlayers);
    } catch (error) {
      console.error('Error handling changingStatus event:', error);
    }
  });

  socket.on('disconnect', () => {
    try {
      const playerIndex = Player.onlinePlayers.findIndex(player => player.userName === socket.userName);
      if (playerIndex !== -1) {
        Player.onlinePlayers.splice(playerIndex, 1);
        socket.disconnect(true);
        io.emit('statusChange', Player.onlinePlayers);
      }
      console.log('User disconnected:', socket.userName);
    } catch (error) {
      console.error('Error handling disconnect event:', error);
    }
  });
});

app.get('/Players', (request, response) => {
  response.send(Player.onlinePlayers);
});

const PORT = process.env.PORT || 8989;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
