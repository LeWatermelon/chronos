import { useState } from "react";
import { useSettings } from "../SettingsContext/SettingsContext";
import { useNavigate } from 'react-router-dom';
import "./NewEvent.css";

export default function Settings({ onClose }) {
  const navigate = useNavigate();
  
  const { settings, updateSettings } = useSettings();

  const [country, setCountry] = useState(settings.country);
  const [timeFormat, setTimeFormat] = useState(settings.timeFormat);
  const [isLoggedOut, setIsLoggedOut] = useState(settings.isLoggedOut);

   async function logout() {
      try {
        const res = await fetch('http://localhost:3000/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        if (res.ok) {
          navigate('/login')
        } else {
          console.error('Error when logout:', await res.text());
        }
      } catch (err) {
        console.error('Logout failed:', err);
      }
  }

  function handleSubmit() {
    updateSettings({
      country,
      timeFormat,
      isLoggedOut,
    });
    onClose();
  }

  return (
    <div className="event-popup">
      <h3>Settings</h3>

      <label>Country:</label>
      <select value={country} onChange={e => setCountry(e.target.value)}>
        <option>Ukraine</option>
        {/* <option>USA</option> */}
        {/* <option>UK</option> */}
        <option>Germany</option>
      </select>

      <label>Time Format:</label>
      <select value={timeFormat} onChange={e => setTimeFormat(e.target.value)}>
        <option value="24h">24-hour</option>
        <option value="12h">12-hour</option>
      </select>

      {/* <label>
        <input
          type="checkbox"
          checked={isLoggedOut}
          onChange={() => setIsLoggedOut(!isLoggedOut)}
        />
        Log out on next start
      </label> */}

      <p className="f4 link dim black db pointer underline" onClick={logout}>Log Out</p>

      <button className="create-btn" onClick={handleSubmit}>
        Save changes
      </button>
    </div>
  );
}