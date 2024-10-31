import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ['online', 'offline', 'ingame'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;

