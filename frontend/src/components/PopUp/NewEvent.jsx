import React, { useState, useEffect } from "react";
import "./NewEvent.css";

export default function NewEvent({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState(15); // minutes before

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
    if (!title) return alert("Title is required");
    if (!allDay && (!start || !end)) return alert("Start & End time required if not All Day");
    if (allDay && (start || end)) return alert("You must choose Start & End time or All Day");

    if (!allDay && new Date(start) > new Date(end)) {
      return alert("Start time cannot be later than End time");
    }

    const eventData = {
      title,
      description,
      start_time: allDay ? null : start,
      end_time: allDay ? null : end,
      location,
      reminders: allDay ? [] : [reminder],
      is_all_day: allDay
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/calendars/${calendarId}/events`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(eventData)
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert("Error: " + error.error);
        return;
      }

      const saved = await res.json();

      onCreate(saved);
      onClose();

    } catch (err) {
      console.error("Event create error:", err);
    }
  }

  return (
    <div className="event-popup">
      {/* Header */}
      <div className="popup-header">
        <h3>Create Event</h3>
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

      <div className="popup-row">
        <input
          type="text"
          placeholder="Add title *"
          className="input-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

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

      <div className="popup-row checkbox-row">
        <input
          type="checkbox"
          checked={allDay}
          onChange={(e) => setAllDay(e.target.checked)}
        />
        <span>All day</span>
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
        <label>Reminder (min)</label>
        <input
          type="number"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
      </div>

      <button className="create-btn" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
}
