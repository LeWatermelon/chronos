import React, { useState, useEffect } from "react";
import "./NewEvent.css";

export default function Settings({ onClose }) {
  const [contry, setContry] = useState("Ukraine");
  const [timeFormat, setTimeFormat] = useState("13:00");
  const [isLogedout, setIsLogedout] = useState(false);

  async function handleSubmit() {
    if (!title) return alert("Title is required");
    if (!calendarId) return alert("Choose a calendar");

    let eventData = { title, description, category, reminders: reminder ? [reminder] : [] };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/calendars/${calendarId}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(eventData)
      });

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
      <div className="popup-header">
        <h3>Settings</h3>
        <i className="fa-solid fa-xmark close-icon" onClick={onClose}></i>
      </div>

      {/* <label>Choose calendar:</label> */}
      <select value={calendarId} onChange={e => setCalendarId(e.target.value)}>
        <option value="">Select a contry </option>
        <optgroup label="My calendars">
          {myCalendars.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
        </optgroup>
      </select>

          <lable>Add participants</lable>
          <div className="popup-row">
            <input
              type="text"
              className="input-title partisipant"
              placeholder="emails, comma separated"
              value={participants}
              onChange={e => setParticipants(e.target.value)}
            />
          </div>

        <button className="create-btn" onClick={handleSubmit}>Save changes</button>
    </div>
  );
}
