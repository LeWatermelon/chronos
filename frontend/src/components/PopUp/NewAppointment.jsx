// NewAppointment.jsx
import React, { useState, useEffect } from "react";
import "./NewEvent.css"; // same styling system

export default function NewAppointment({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [guests, setGuests] = useState("");
  const [reminder, setReminder] = useState(15);

  const [myCalendars, setMyCalendars] = useState([]);
  const [otherCalendars, setOtherCalendars] = useState([]);
  const [calendarId, setCalendarId] = useState("");

  // Load calendars like in NewEvent
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
    if (!title || !start || !end)
      return alert("Title, start, and end time are required");

    if (!calendarId)
      return alert("Select calendar");

    if (new Date(start) > new Date(end)) {
      return alert("Start time cannot be later than End time");
    }

    const payload = {
      title,
      start_time: start,
      end_time: end,
      description,
      location,
      participants: guests
        .split(",")
        .map(g => g.trim())
        .filter(g => g.length > 0),
      reminders: reminder ? [reminder] : [],
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/calendars/${calendarId}/appointments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) {
        const err = await res.json();
        alert("Error: " + err.error);
        return;
      }

      const saved = await res.json();
      onCreate(saved);
      onClose();
    } catch (err) {
      console.error("Appointment create error:", err);
    }
  }

  return (
    <div className="event-popup">
      <div className="popup-header">
        <h3>Create Appointment</h3>
        <i className="fa-solid fa-xmark close-icon" onClick={onClose}></i>
      </div>

      <label>Choose calendar:</label>
      <select value={calendarId} onChange={e => setCalendarId(e.target.value)}>
        <option value="">Select a calendar</option>

        <optgroup label="My calendars">
          {myCalendars.map(c => (
            <option key={c._id} value={c._id}>{c.title}</option>
          ))}
        </optgroup>

        <optgroup label="Shared with me">
          {otherCalendars.map(c => (
            <option key={c._id} value={c._id}>{c.title}</option>
          ))}
        </optgroup>
      </select>

      <input
        type="text"
        placeholder="Appointment title *"
        className="input-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="popup-row">
        <label>Start</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>

      <div className="popup-row">
        <label>End</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      <div className="popup-row">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="popup-row">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="popup-row">
        <label>Guests (emails, comma separated)</label>
        <input
          type="text"
          placeholder="e.g. john@mail.com, anna@mail.com"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
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
