import Appointment from "../../database/models/Appointment.js";

async function handleUpdateAppointment(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const appointment = await Appointment.findById(id).populate("calendar_id");
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        if (String(appointment.calendar_id.owner) !== req.session.user.id) {
            return res.status(403).json({ error: "No access" });
        }

        Object.assign(appointment, updates);
        await appointment.save();

        res.status(200).json({ message: "Appointment updated", appointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleUpdateAppointment;
