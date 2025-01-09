import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
    }
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;