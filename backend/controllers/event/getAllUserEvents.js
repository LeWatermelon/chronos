import Event from "../../database/models/Event.js";
import Calendar from "../../database/models/Calendar.js";
import User from "../../database/models/User.js";


async function handleGetAllUserEvents(req, res) {
    try {
        const userId = req.session.user.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // get all calendars user owns or is a member of
        const calendars = await Calendar.find({
            $or: [
                { owner: userId },
                { members: userId }
            ]
        });

        const calendarIds = calendars.map(c => c._id);

        // Get events from user's calendars
        const calendarEvents = await Event.find({ 
            calendar_id: { $in: calendarIds } 
        });

        // Get events shared directly with this user (by email or userid)
        const sharedEvents = await Event.find({
            calendar_id: { $nin: calendarIds }, // Not from their calendars
            $or: [
                { 'shared_with.email': user.email },
                { 'shared_with.userid': userId }
            ]
        });

        // Combine and return
        const allEvents = [...calendarEvents, ...sharedEvents];
        
        res.json(allEvents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleGetAllUserEvents;