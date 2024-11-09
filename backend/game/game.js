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



io.on('connection', (socket) => {
    console.log('Client connected to the game server', socket.id);

    socket.on('connected', (userName) => {
        socket.user = userName; 
        console.log('user connected:', userName);
    });
    
  socket.on('send invite', (sender,senderId,reciever,recieverId) => {
    console.log('Invite sent from', sender, 'to', reciever);
    io.to(recieverId).emit('recieve invite', sender, senderId,reciever);
  });

  socket.on('answer invite', (reciever,sender,senderId,answer) => {
    console.log('Invite answer from', reciever, 'is', answer);
    if(answer){
      io.emit('start game', reciever,sender,senderId);
    }
    io.emit('recieve answer', reciever,answer);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected from the game server');
  });



});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Game server is running on port ${PORT}`));
