import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

const app = express();
const server = http.createServer(app);



const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5555', 'http://localhost:3050', 'http://localhost:8989'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5555', 'http://localhost:3050', 'http://localhost:8989'],
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(express.json());
   
let counter = 0;
class Player {
    static onlinePlayers = []; // Initialize the static array to store online players

    static getOnlinePlayers() {
        return Player.onlinePlayers;
    }

    constructor({ userName, status }) {
        this.userName = userName;
        this.status = status;
    }
}

io.on('connection', (socket) => {
    
    
    socket.on('connected', (user) => {
        try {
            const player = new Player({ userName: user, status: 'online' });
            if(!Player.onlinePlayers.some(player => player.userName === user)){
            Player.onlinePlayers.push(player);
            console.log(Player.onlinePlayers);
            }
            socket.userName = user; // Store userName in socket session
            io.emit('statusChange',Player.onlinePlayers);
        } catch (error) {
            console.error('Error handling connected event:', error);
        }   
});
    socket.on('disconnect', () => {
        try {
            console.log(`user disconnected ${counter}`);
            counter++;
            const updatedOnlinePlayers=Player.onlinePlayers.filter(player=>player.userName===socket.userName);
                Player.onlinePlayers=updatedOnlinePlayers;
            io.emit('statusChange', Player.getOnlinePlayers());
            console.log('disconnected', Player.getOnlinePlayers());
            // io.disconnectSockets(); // Removed to prevent disconnecting all sockets
        } catch (error) {
            console.error('on disconnectiong Error handling disconnect event:', error);
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
