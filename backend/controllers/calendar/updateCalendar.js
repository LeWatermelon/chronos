import Calendar from "../../database/models/Calendar.js";

async function handleUpdateCalendar(req, res) {
    const { id } = req.params;
    const updates = req.body;

    try {
        const calendar = await Calendar.findById(id);

        if (!calendar) {
            return res.status(404).json({ error: "Calendar not found" });
        }

        if (calendar.owner.toString() !== req.session.user.id) {
            return res.status(403).json({ error: "Not authorized" });
        }

        Object.assign(calendar, updates);
        await calendar.save();

        res.json(calendar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleUpdateCalendar;
