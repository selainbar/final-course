import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Message from './Message.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5555', 'http://localhost:3000','http://localhost:8989'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});


app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5555', 'http://localhost:3000', 'http://localhost:8989'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(express.json());


io.on('connection', (socket) => {    
    socket.on('connected', (user) => {
        console.log('user connected:', user);
        socket.user = user; // Store user information in socket object
        const newMessage = {sender:user, content:`${user} has joined the chat`, time: new Date()};
        io.emit('message', newMessage); 
    });

    socket.on('messageSent', async (message) => {
        try {
            console.log('message received:', message);
            const newMessage = new Message(message);
            await newMessage.save();
            io.emit('message', message);
        
        } catch (error) {
            console.error('Error handling message event:', error);
        }
    });
  // Handle user disconnection
   socket.on('disconnect', () => { 
    if (socket.user) 
        { console.log('user disconnected:', socket.user); 
            const newMessage = {sender: socket.user, content: `${socket.user} has left the chat`, time: new Date()}; 
            io.emit('message', newMessage); 
        } 
        else { 
            console.log('user disconnected without being identified'); } });
    });





// Connect to MongoDB and Start Server
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('connected to mongoDB');
        
    })
    .then(() => {
        server.listen(process.env.PORT, () => {
            console.log(`app is listening to port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });