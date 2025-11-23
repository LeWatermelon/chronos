import Calendar from "../../database/models/Calendar.js";

async function handleGetMembers(req, res) {
    try {
        const { calendarId } = req.params;

        const calendar = await Calendar.findById(calendarId)
            .populate("members", "email username");

        if (!calendar) {
            return res.status(404).json({ error: "Calendar not found" });
        }        

        return res.json({ members: calendar.members });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

export default handleGetMembers;
