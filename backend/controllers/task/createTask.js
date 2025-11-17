import Task from "../../database/models/Task.js";
import Calendar from "../../database/models/Calendar.js";

async function handleCreateTask(req, res) {
  try {
    const { calendarId } = req.params;
    const { title, description, due_date, reminders } = req.body;

    const calendar = await Calendar.findOne({ _id: calendarId, owner: req.session.user.id });
    if (!calendar) return res.status(403).json({ error: "No access or calendar not found" });

    const task = new Task({
      calendar_id: calendarId,
      title,
      description,
      due_date,
      reminders
    });

    await task.save();
    res.status(201).json({ message: "Task created", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export default handleCreateTask;
