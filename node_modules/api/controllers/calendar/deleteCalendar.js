import Calendar from "../../database/models/Calendar.js";

async function handleDeleteCalendar(req, res) {
    const { id } = req.params;

    try {
        const calendar = await Calendar.findById(id);

        if (!calendar) {
            return res.status(404).json({ error: "Calendar not found" });
        }

        if (calendar.owner.toString() !== req.session.user.id) {
            return res.status(403).json({ error: "Not authorized" });
        }

        await calendar.deleteOne();
        res.json({ message: "Calendar deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleDeleteCalendar;
