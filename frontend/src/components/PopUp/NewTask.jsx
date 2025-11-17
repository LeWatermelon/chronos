// NewTask.jsx
import React, { useState, useEffect } from "react";
import "./NewEvent.css"; // reuse same styles

export default function NewTask({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hasTime, setHasTime] = useState(false);
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState(15);

  const [myCalendars, setMyCalendars] = useState([]);
  const [otherCalendars, setOtherCalendars] = useState([]);
  const [calendarId, setCalendarId] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/calendars`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setMyCalendars(data.myCalendars ?? []);
        setOtherCalendars(data.otherCalendars ?? []);
      })
      .catch(err => console.error("Calendar load error:", err));
  }, []);


  async function handleSubmit() {
    if (!calendarId) return alert("Choose a calendar first");
    if (!title || !date) return alert("Title & Date required");

    // формируем due_date: если есть время, добавляем
    const due_date = hasTime && time ? new Date(`${date}T${time}`) : new Date(date);

    const taskData = {
      title,
      description,
      due_date,
      reminders: reminder ? [reminder] : [],
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/calendars/${calendarId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Error: " + error.error);
        return;
      }

      const saved = await res.json();
      onCreate(saved.task); // возвращаем созданную таску
      onClose();

    } catch (err) {
      console.error("Task create error:", err);
    }
  };

  return (
    <div className="event-popup">
      <div className="popup-header">
        <h3>Create Task</h3>
        <i className="fa-solid fa-xmark close-icon" onClick={onClose}></i>
      </div>

      <label>Choose calendar:</label>
      <select value={calendarId} onChange={e => setCalendarId(e.target.value)}>
        <option value="">Select a calendar</option>

        <optgroup label="My calendars">
          {myCalendars.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
        </optgroup>

        <optgroup label="Shared with me">
          {otherCalendars.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
        </optgroup>
      </select>

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
