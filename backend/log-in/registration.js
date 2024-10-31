import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Player from './models/player.js';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());

const allowedOrigins = ['http://localhost:5173','http://localhost:5555','http://localhost:5890','https://www.postman.com'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
const PORT = process.env.REGISTER_PORT ;

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        app.listen(process.env.REGISTER_PORT, () => {
            console.log('Server is running on port: ' +REGISTER_PORT);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });



app.get('/', (request, response) => {

    response.send('Hello from registration service');});




