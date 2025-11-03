import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password_hash: { type: String, required: true },
    full_name: {type: String},
    locale: { type: String, default: 'en-US' },
    timezone: { type: String, default: 'UTC' },
    calendars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }]
}, { timestamps: true });

export default mongoose.model('User', UserSchema);;