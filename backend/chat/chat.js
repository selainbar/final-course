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
    },
    maxHttpBufferSize: 1e8//100MB
});

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5555', 'http://localhost:3000', 'http://localhost:8989'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(express.json());

io.on('connection', (socket) => {   
    console.log('Client connected to the chat server'); 
    socket.on('connected', (user) => {
        console.log('user connected:', user);
        socket.user = user; // Store user information in socket object
    });

    socket.on('messageSent', async (message) => {
        try {
            console.log('message received:', message);
            const newMessage = new Message(message);
            console.log('new message:', newMessage);
            await newMessage.save();
            io.emit('message', message);
        } catch (error) {
            console.error('Error handling message event:', error);
        }
    });

socket.on('disconnect', () => {
    console.log('user disconnected:', socket.user);
    socket.user = null;
    socket.disconnect(true);
});
 
});

app.get('/messages', async (request, response) => {
    try {
        const Messages = await Message.find();
        console.log('messages:', Messages);
        response.json(Messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        response.status(500).send('Error fetching messages');
    }
});

// Connect to MongoDB and Start Server
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('connected to MongoDB');
        server.listen(process.env.PORT, () => {
            console.log(`Chat server is listening on port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
