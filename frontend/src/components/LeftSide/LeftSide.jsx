import React, { useState } from 'react';
import CheckBox from '../ui/CheckBox/CheckBox';
import MiniCalendar from '../SmallCalendar/SmallCalendar';
import './LeftSide.css';

const LeftSide = () => {
  const [myCalendarsOpen, setMyCalendarsOpen] = useState(true);
  const [otherCalendarsOpen, setOtherCalendarsOpen] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isCheked, setCheck] = useState(false);
  
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
                  <div className="calendar-item">
                    <CheckBox text="main" onChange={() => {}} id="main-calendar"/>
                    <i className="fa-solid fa-ellipsis-vertical calendar-arrow"></i>
                  </div>
                  <div className="calendar-item">
                    <CheckBox text="KHPI" onChange={() => {}}  id="khpi-calendar"/>
                    <i className="fa-solid fa-ellipsis-vertical calendar-arrow"></i>
                  </div>
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
                  <div className="calendar-item">
                    {/* Добавить апі + брать с дб  */}
                    <CheckBox text="Feiertage" onChange={() => {}} id="feiertage-calendar"/>
                    <i className="fa-solid fa-ellipsis-vertical calendar-arrow"></i>
                  </div>
                   <div className="calendar-item">
                    <CheckBox text="Свята" onChange={() => {}}  id="feiertage-calendar"/>
                    <i className="fa-solid fa-ellipsis-vertical calendar-arrow"></i>
                  </div>
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
