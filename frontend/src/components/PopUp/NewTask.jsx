// NewTask.jsx
import React, { useState } from "react";
import "./NewEvent.css"; // reuse same styles

export default function NewTask({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hasTime, setHasTime] = useState(false);
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState(10);

  const handleSubmit = () => {
    if (!title || !date) return alert("Title & Date required");

    onCreate({
      title,
      date,
      time: hasTime ? time : null,
      description,
      reminders: reminder ? [reminder] : [],
      type: "task",
    });

    onClose();
  };

  return (
    <div className="event-popup">
      <div className="popup-header">
        <h3>Create Task</h3>
        <i className="fa-solid fa-xmark close-icon" onClick={onClose}></i>
      </div>

      <input
        type="text"
        placeholder="Task title *"
        className="input-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="popup-row">
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="popup-row checkbox-row">
        <input
          type="checkbox"
          checked={hasTime}
          onChange={(e) => setHasTime(e.target.checked)}
        />
        <span>Add time</span>
      </div>

      {hasTime && (
        <div className="popup-row">
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      )}

      <div className="popup-row">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="popup-row">
        <label>Reminder (min before)</label>
        <input
          type="number"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
      </div>

      <button className="create-btn" onClick={handleSubmit}>Save</button>
    </div>
  );
}
