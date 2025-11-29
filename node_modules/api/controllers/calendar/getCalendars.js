import Calendar from "../../database/models/Calendar.js";

async function handleGetCalendars(req, res) {
    const owner = req.session?.user?.id;

    try {
        const calendars = await Calendar.find({ owner });
        res.json(calendars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleGetCalendars;
