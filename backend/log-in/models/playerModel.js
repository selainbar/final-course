import mongoose from 'mongoose'

const playerSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type: String,
        required:true,
        
    }
})

const Player=mongoose.model('Player',playerSchema);

export default Player