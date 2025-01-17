import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Player from './models/Player.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();



app.use(cookieParser())
//CORS so diffrent services can connect to this one
app.use(express.json());
//what origins can use my app
const allowedOrigins = ['http://localhost:5173',];

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


// creating the checking refresh token
app.post('/userRefresh_token', async (request, response) => {
    try {
        const{userName,password}=request.body;
        if (request.body.userName === "" || request.body.password === "") {
            return response.status(403).send('Fill up your username and password');
        }
        const player = await Player.findOne({ userName });
        if (!player) {
            return response.status(403).send('User not found');
        }        
        const match = await bcrypt.compare(password, player.password);
        if (!match) {
            response.cookie('refreshToken', "", { httpOnly: true });
            return response.status(403).send('User not found');
        }
        
        const token = player.refreshToken;
        response.cookie('refreshToken', token, { httpOnly: true });
        response.status(200).send(token);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


 
 app.get('/JWTvalid',(request,response)=>{
  const token=request.cookies.refreshToken;
if (!token) {
    return response.status(401).send('Unauthorized');
  }
    try{
   const player=jwt.verify(token,process.env.JWT_REFRESH_SECRET);
const accessToken=jwt.sign({userName:player.userName}, process.env.JWT_ACCESS_SECRET, { expiresIn: `1s` });
response.cookie('accessToken',accessToken,{httpOnly:true})
response.cookie('user',player.userName,{httpOnly:false})
return response.status(200).send(player.userName);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
 }})

app.get('/checkTokens', (request, response) => {
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;
    console.log('checking tokens'); 

    if (!accessToken) {
        if (!refreshToken) {
            response.cookie('refreshToken', "", { httpOnly: true });
            return response.status(401).send('Unauthorized');
        }

        try {
            const player = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const newAccessToken = jwt.sign({ userName: player.userName }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
            response.cookie('accessToken', newAccessToken, { httpOnly: true });
            return response.status(200).send('New access token created');
        } catch (error) {
            response.cookie('refreshToken', " ", { httpOnly: true });
            return response.status(401).send('Unauthorized');
        }
    }

    try {
        jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        return response.status(200).send('Access token is valid');
    } catch (error) {
        if (!refreshToken) {
            response.cookie('refreshToken', " ", { httpOnly: true });
            return response.status(401).send('Unauthorized');
        }

        try {
            const player = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const newAccessToken = jwt.sign({ userName: player.userName }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
            response.cookie('accessToken', newAccessToken, { httpOnly: true });
            return response.status(200).send('New access token created');
        } catch (error) {
            response.cookie('refreshToken', " ", { httpOnly: true });
            return response.status(401).send('Unauthorized');
        }
    }
});


 app.get('/logout',(request,response)=>{
    response.cookie('refreshToken', "", { httpOnly: true });
    response.cookie('accessToken', "", { httpOnly: true });
    response.cookie('user', "", { httpOnly: false });
    response.status(200).send('User logged out');
 })

 
 app.post('/register', async (request, response) => {
    try {
        const { userName, password } = request.body;
        if (!userName || !password) {
            return response.status(403).send('Fill up your username and password');
        }

        const player = await Player.findOne({userName:request.body.userName});
console.log(player);
        if (player) {
            return response.status(403).send('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const cryptedPassword = await bcrypt.hash(password, salt);
const jwtToken = jwt.sign({ userName }, process.env.JWT_REFRESH_SECRET);
        const newPlayer = new Player({
            userName,
            password: cryptedPassword,
            refreshToken: jwtToken
        });
console.log(newPlayer);
        await newPlayer.save();
response.cookie('refreshToken',newPlayer.refreshToken, { httpOnly: true });
        response.status(200).send('User created');
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
 
 


// Connect to MongoDB and Start Server
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('connected to mongoDB');
        
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`app is listening to port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });