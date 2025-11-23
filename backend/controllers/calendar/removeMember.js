import Calendar from "../../database/models/Calendar.js";

async function handleRemoveMember(req, res) {
    try {
        const { calendarId } = req.params;
        const { userId } = req.body;

        const calendar = await Calendar.findById(calendarId);

        console.log(calendar);
        

        if (!calendar) return res.status(404).json({ error: "Calendar not found" });

        // только владелец может удалять участников
        if (calendar.owner.toString() !== req.session.user.id) {
            return res.status(403).json({ error: "Access denied" });
        }

        calendar.members = calendar.members.filter(
            id => id.toString() !== userId
        );

        await calendar.save();

        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export default handleRemoveMember;
