import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5555', 'http://localhost:3000','http://localhost:8989'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and headers with credentials
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('a user connected');
    
    // Define the 'inGame' event inside the connection block
    socket.on('inGame', (userName) => {
        console.log(`User ${userName} is in the game`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
