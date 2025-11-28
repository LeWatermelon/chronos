import Calendar from "../database/models/Calendar.js";
import Event from "../database/models/Event.js";
import User from "../database/models/User.js";

async function checkEventPermission(eventId, userId, requiredPermission = 'view') {
    try {
        const event = await Event.findById(eventId).populate('calendar_id');
        if (!event) return false;

        const calendar = event.calendar_id;
        if (!calendar) return false;

        if (calendar.owner.toString() === userId) {
            return true;
        }

        const isCalendarMember = calendar.members?.some(
            memberId => memberId.toString() === userId
        );

        if (isCalendarMember) {
            // Check calendar permission level
            const shareEntry = calendar.shared_with?.find(
                share => share.userid?.toString() === userId
            );

            if (!shareEntry) {
                // default to edit
                return true;
            }

            if (requiredPermission === 'edit') {
                return shareEntry.permission === 'edit';
            }

            // view permission
            return true;
        }

        if (event.shared_with && event.shared_with.length > 0) {
            const user = await User.findById(userId);
            
            const eventShareEntry = event.shared_with.find(
                share => 
                    share.userid?.toString() === userId || 
                    (user && share.email === user.email)
            );

            if (eventShareEntry && eventShareEntry.accepted) {
                if (requiredPermission === 'edit') {
                    return eventShareEntry.permission === 'edit';
                }
                return true; // Has view permission
            }
        }

        return false;
    } catch (error) {
        console.error("Error checking event permission:", error);
        return false;
    }
}

export default checkEventPermission;