import Appointment from "../../database/models/Appointment.js";

async function handleDeleteAppointment(req, res) {
    try {
        const { id } = req.params;

        const appointment = await Appointment.findById(id).populate("calendar_id");
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        if (String(appointment.calendar_id.owner) !== req.session.user.id) {
            return res.status(403).json({ error: "No access" });
        }

        await appointment.deleteOne();

        res.status(200).json({ message: "Appointment deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export default handleDeleteAppointment;
