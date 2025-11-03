import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    event_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Event',
        required: true
    },
    message: String,
    is_read: { 
        type: Boolean, 
        default: false 
    },
    send_time: Date
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
