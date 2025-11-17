import Task from "../../database/models/Task.js";

async function handleUpdateTask(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const task = await Task.findById(id).populate("calendar_id");
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        if (String(task.calendar_id.owner) !== req.session.user.id) {
            return res.status(403).json({ error: "No access" });
        }

        Object.assign(task, updates);
        await task.save();

        res.status(200).json({ message: "Task updated", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

export default handleUpdateTask;
