import Calendar from "../../database/models/Calendar.js";

async function handleCreateCalendar(req, res) {
    const { title, color } = req.body;
    const owner = req.session.user.id;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    try {
        const calendar = await Calendar.create({
            title,
            color: color || '#2196f3',
            owner
        });
        res.json(calendar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleCreateCalendar;
