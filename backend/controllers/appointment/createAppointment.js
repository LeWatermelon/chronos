import Appointment from "../../database/models/Appointment.js";
import Calendar from "../../database/models/Calendar.js";

async function handleCreateAppointment(req, res) {
  try {
    const { calendarId } = req.params;
    const { title, description, start_time, end_time, location, participants, reminders } = req.body;

    const calendar = await Calendar.findOne({ _id: calendarId, owner: req.session.user.id });
    if (!calendar) return res.status(403).json({ error: "No access or calendar not found" });

    const appointment = new Appointment({
      calendar_id: calendarId,
      title,
      description,
      start_time,
      end_time,
      location,
      participants,
      reminders
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment created", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export default handleCreateAppointment;
