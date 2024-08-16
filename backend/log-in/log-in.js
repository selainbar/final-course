import express, { response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Player from './models/playerModel.js';
import jwt from 'jsonwebtoken';
import bcrypt, { genSalt } from 'bcrypt';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();


 const cryptingPasword=async(password)=>{
   const cryptedPassword= await bcrypt.hash(password,salt);
   return cryptedPassword;
}
app.use(cookieParser())
//CORS so diffrent services can connect to this one
app.use(express.json());
//what origins can use my app
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    origin: function (origin, callback) {
      // Check if the origin is allowed
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies and headers with credentials
    optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204
  };
  
app.use(cors(corsOptions));

// creating the access token
app.post('/access_token', async (request,response)=>{
    try{
        if(request.body.userName==""||request.body.password=="")
            {
                return response.status(403).send('fill up youre username and password');
            }
            const player=Player.findOne(request.body.userName);
       if(!bcrypt.compare(request.body.password,player.password))
       {
            response.cookie('Gameon_access_token',"",{httpOnly:true})
            return response.status(403).send('User not found');
        }
        const token = jwt.sign({userName: userName,password:password}, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        response.cookie('Gameon_access_token',token,{httpOnly:true})
        response.status(200).send(token)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

 
 app.get('/JWTvalid',(request,response)=>{
  const token=request.cookies.Gameon_access_token

if (!token) {
    return response.status(401).send('Unauthorized');
  }
    try{
   const {userName,password}=jwt.verify(token,process.env.JWT_ACCESS_SECRET)
//const userName=jwt.verify(tokenID,process.env.JWT_ID_SECRET)
//const accessLVL =jwt.verify(tokenACCESS,process.env.JWT_ACCESS_SECRET)
//const refreshTOKEN =jwt.verify(tokenREFRESH,process.env.JWT_REFRESH_SECRET)
return response.status(200).send(
    //userName:userName,
   //accessLVL
    //refreshTOKEN: refreshTOKEN
    {userName:userName,
        password:password
    }
);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
 }})
// Post Route to Create New Player
app.post('/players', async (request, response) => {
    try {
        const { userName, password } = request.body;

        if (!userName || !password) {
            return response.status(400).send({ message: 'Send all required fields' });
        }
        const salt= await bcrypt.genSalt(10);
        const hashedpassword= await bcrypt.hash(request.body.password,salt);
        const newPlayer = {
            userName:request.body.userName,
            password:hashedpassword,
        };

        const player = await Player.create(newPlayer);
        console.log(player.userName+' '+player.password)
        return response.status(201).send(player);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
console.log('app connected to DB');

// Connect to MongoDB and Start Server
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`app is listening to port : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
