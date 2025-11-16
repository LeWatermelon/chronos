// NewCalendar.jsx
import React, { useState } from "react";
import "./NewEvent.css";

const presetColors = [
  "#4285F4", "#DB4437", "#F4B400", "#0F9D58",
  "#AB47BC", "#00ACC1", "#FF7043", "#9E9D24"
];

export default function NewCalendar({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#4285F4");

  const handleSubmit = () => {
    if (!title) return alert("Calendar title is required");

    onCreate({
      title,
      color
    });

    onClose();
  };

  return (
    <div className="event-popup">
      {/* Header */}
      <div className="popup-header">
        <h3>Create Calendar</h3>
        <i className="fa-solid fa-xmark close-icon" onClick={onClose}></i>
      </div>

      {/* Title */}
      <div className="popup-row">
        <input
          type="text"
          className="input-title"
          placeholder="Calendar name *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Color Picker Section */}
      <div className="popup-row">
        <label>Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            width: "50px",
            height: "35px",
            padding: 0,
            borderRadius: "6px",
            cursor: "pointer",
          }}
        />
      </div>

      {/* Google-style color presets */}
      <div className="popup-row">
        <label>Preset colors</label>
        <div className="color-preset-row">
          {presetColors.map((c) => (
            <div
              key={c}
              className={`color-bubble ${color === c ? "active" : ""}`}
              style={{
                backgroundColor: c,
              }}
              onClick={() => setColor(c)}
            ></div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button className="create-btn" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
}
