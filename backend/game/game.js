import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5555', 'http://localhost:3000', 'http://localhost:8989'],
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
       try{

       }
       catch (error) {
        console.error('Error handling connected event:', error);
    }
    });

    socket.on('messageSent', async (message) => {
        try {
         
        } catch (error) {
            console.error('Error handling message event:', error);
        }
    });

    socket.on('disconnect', () => {
        try {
            
        } catch (error) {
            console.error('Error handling disconnect event:', error);
        }
    }
)});