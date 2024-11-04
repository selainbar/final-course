import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

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
class Player {
    constructor({ userName, status }) {
        this.userName = userName;
        this.status = status;
    }
}

const onlinePlayers = [];

io.on('connection', (socket) => {
    
    
    socket.on('connected', (user) => {
        try {
            const player = new Player({ userName: user, status: 'online' });
            onlinePlayers.push(player);
            io.emit('statusChange',onlinePlayers);
        } catch (error) {
            console.error('Error handling connected event:', error);
        }   
});
    socket.on('disconnect', (userName) => {
        try {
            console.log('user disconnected');
            const playerIndex=onlinePlayers.findIndex((player)=>player.userName===userName);
            onlinePlayers.splice(playerIndex,1);
            io.emit('statusChange', onlinePlayers);
        } catch (error) {
            console.error(' on disconnectiong Error handling disconnect event:', error);
        }
    });
});

const PORT = process.env.PORT || 8989;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
