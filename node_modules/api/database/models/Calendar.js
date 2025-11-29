import mongoose from 'mongoose';

const CalendarSchema = new mongoose.Schema({
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    color: { 
        type: String, 
        default: '#2196F3' // цвет для UI
    },
    is_visible: { 
        type: Boolean, 
        default: true 
    },
}, { timestamps: true });

const Calendar = mongoose.model('Calendar', CalendarSchema);

export default Calendar;
