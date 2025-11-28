import Event from "../../database/models/Event.js";
import User from "../../database/models/User.js";
import checkEventPermission from "../../middleware/checkEventPermission.js";
import crypto from "crypto";

async function handleUpdateEvent(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const event = await Event.findById(id).populate("calendar_id");

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        const canEdit = await checkEventPermission(
            id, 
            req.session.user.id, 
            'edit'
        );
        
        if (!canEdit) {
            return res.status(403).json({ error: "Access denied: No permission to edit this event" });
        }

        // kolkhoz
        if (updates.category === "arrangement" && updates.participants) {
            const newParticipants = Array.isArray(updates.participants) 
                ? updates.participants 
                : [];

            // get existing participant emails from shared_with
            const existingParticipantEmails = event.shared_with
                ? event.shared_with
                    .filter(share => share.email && event.participants?.includes(share.email))
                    .map(share => share.email)
                : [];

            // find participants to add (new ones not in shared_with)
            const participantsToAdd = newParticipants.filter(
                email => !existingParticipantEmails.includes(email)
            );

            // find participants to remove (old ones not in new list)
            const participantsToRemove = existingParticipantEmails.filter(
                email => !newParticipants.includes(email)
            );

            // initialize shared_with should it not exist
            if (!event.shared_with) {
                event.shared_with = [];
            }

            // remove old participants from shared_with
            if (participantsToRemove.length > 0) {
                event.shared_with = event.shared_with.filter(
                    share => !participantsToRemove.includes(share.email)
                );
            }

            // add new participants to shared_with
            for (const email of participantsToAdd) {
                if (!email.trim()) continue;
                
                const participantUser = await User.findOne({ email: email.trim() });
                
                const shareToken = crypto.randomBytes(32).toString('hex');
                
                const shareEntry = {
                    email: email.trim(),
                    permission: 'view',
                    accepted: true,
                    shareToken,
                    sharedBy: req.session.user.id,
                    sharedAt: new Date()
                };
                
                if (participantUser) {
                    shareEntry.userid = participantUser._id;
                }
                
                event.shared_with.push(shareEntry);
            }
        }

        Object.assign(event, updates);

        await event.save();

        res.json({ message: "Event updated", event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleUpdateEvent;