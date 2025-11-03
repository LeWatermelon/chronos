import mongoose from 'mongoose';

const CalendarSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    color: { 
        type: String, 
        default: '#2196F3' // цвет для UI
    },
    is_default: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

const Calendar = mongoose.model('Calendar', CalendarSchema);

export default Calendar;
