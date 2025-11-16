// NewAppointment.jsx
import React, { useState } from "react";
import "./NewEvent.css"; // same styling system

export default function NewAppointment({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [guests, setGuests] = useState("");

  const handleSubmit = () => {
    if (!title || !start || !end) return alert("Required fields missing");

    onCreate({
      title,
      start_time: start,
      end_time: end,
      description,
      location,
      guests: guests
        .split(",")
        .map((g) => g.trim())
        .filter((v) => v),
      type: "appointment",
    });

    onClose();
  };

  return (
    <div className="event-popup">
      <div className="popup-header">
        <h3>Create Appointment</h3>
        <i className="fa-solid fa-xmark close-icon" onClick={onClose}></i>
      </div>

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
        <inputs
          type="text"
          placeholder="e.g. john@mail.com, anna@mail.com"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>

      <button className="create-btn" onClick={handleSubmit}>Save</button>
    </div>
  );
}
