import mongoose from "mongoose";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { createServer } from "http";
import {Server} from 'socket.io'

dotenv.config()
//create a socket.io
//create a variable of online players with document ID,userName,room\socketID
 const app = express();
 const server=createServer(app);
 const io= new Server(server,{
    cors:{origin:'*'}
 });
app.use(cors());

io.on('connection',(socket)=>{
    console.log(socket)
    
})




server.listen(process.env.PORT, () => {
    console.log(`app is listening to port : ${process.env.PORT}`);
});