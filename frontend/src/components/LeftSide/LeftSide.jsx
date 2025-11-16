import React, { useState, useEffect } from 'react';
import CheckBox from '../ui/CheckBox/CheckBox';
import MiniCalendar from '../SmallCalendar/SmallCalendar';
import './LeftSide.css';

const LeftSide = () => {
  const [myCalendarsOpen, setMyCalendarsOpen] = useState(true);
  const [otherCalendarsOpen, setOtherCalendarsOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  // const [isCheked, setCheck] = useState(false);

  const [myCalendars, setMyCalendars] = useState([]);
  const [otherCalendars, setOtherCalendars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/calendars", {
      method: "GET",
      credentials: "include",
    })
      .then(async response => {
        if (!response.ok) {
          throw new Error("Server error");
        }
        return await response.json();
      })
      .then(data => {
        setMyCalendars(data.myCalendars);
        setOtherCalendars(data.otherCalendars);
      })
      .catch(err => {
        console.error("Failed to load calendars:", err);
      });
  }, []);
  
  return (
    <div className={`left-side ${collapsed ? 'collapsed' : ''}`}>
      {/* Collapse/Expand Button */}
      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        <i className={`fa-solid fa-chevron-left ${collapsed ? 'rotate-180' : ''}`}></i>
      </button>

     {!collapsed && (
      <div className="left-side-container">
        {/* Header Section */}
        <div className="header mt-5">
          <div className="menu-item mr-4">
            <span className="menu-text gap-1">Create</span>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
            <i className="fa-solid fa-gear menu-item"></i>
        </div>

        {/* Mini Calendar */}
        <div className="smallCalendar">
          {!collapsed && <MiniCalendar />}
        </div>

        {/* Calendar Lists */}
        {!collapsed && (
          <div className="calendar-section">
            {/* My Calendars */}
            <div>
              <div
                className="calendar-header"
                onClick={() => setMyCalendarsOpen(!myCalendarsOpen)}
              >
                <span>My calendars</span>
                <i className={`fa-solid fa-chevron-down transition-transform calendar-arrow ${myCalendarsOpen ? 'rotate-0' : 'rotate-180'}`}></i>
              </div>
              {/* Заменить на запрос из базы */}
              {myCalendarsOpen && (
                <>
                  {myCalendars.map(calendar => (
                    <div className="calendar-item" key={calendar._id}>
                      <CheckBox
                        text={calendar.title}
                        id={`my-${calendar._id}`}
                        onChange={() => {}}
                      />
                      <i className="fa-solid fa-ellipsis-vertical calendar-arrow"></i>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Other Calendars */}
            <div>
              <div
                className="calendar-header"
                onClick={() => setOtherCalendarsOpen(!otherCalendarsOpen)}
              >
                <span>Other calendars</span>
                <i className={`fa-solid fa-chevron-down transition-transform calendar-arrow ${otherCalendarsOpen ? 'rotate-0' : 'rotate-180'}`}></i>
              </div>
              {otherCalendarsOpen && (
                <>
                  {otherCalendars.map(calendar => (
                    <div className="calendar-item" key={calendar._id}>
                      <CheckBox
                        text={calendar.title}
                        id={`other-${calendar._id}`}
                        onChange={() => {}}
                      />
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default LeftSide;
