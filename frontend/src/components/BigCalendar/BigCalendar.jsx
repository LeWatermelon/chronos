import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../ui/Button/Button';
import SearchView from '../ui/SearchView/SearchView';
import CalendarSidebar from '../LeftSide/LeftSide';
import './BigCalendar.css';

const Calendar = () => {
  const [selectedView, setSelectedView] = useState('Week');
  const [selectedCells, setSelectedCells] = useState(new Set());

  const handleCellClick = (timeSlot, dayIndex) => {
    const cellKey = `${timeSlot}-${dayIndex}`;
    setSelectedCells(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cellKey)) {
        newSet.delete(cellKey);
      } else {
        newSet.add(cellKey);
      }
      return newSet;
    });
  };

  const renderTimeBlocks = (timeSlot) => {
    const days = 7;
    const blocks = [];

    for (let dayIndex = 0; dayIndex < days; dayIndex++) {
      const cellKey = `${timeSlot}-${dayIndex}`;
      const isSelected = selectedCells.has(cellKey);
      blocks.push(
        <div
          key={dayIndex}
          className={`calendar-cell ${isSelected ? 'selected' : ''}`}
          onClick={() => handleCellClick(timeSlot, dayIndex)}
        />
      );
    }

    return <div className="time-blocks">{blocks}</div>;
  };

  return (
    <>
      <Helmet>
        <title>Weekly Calendar View | Calendar Pro</title>
      </Helmet>

      <main className="calendar-main">
        <div className="calendar-container">
          <div className="calendar-layout">
            <CalendarSidebar />

            <div className="calendar-content">
              <div className="calendar-toolbar">
                <div className="toolbar-left">
                  <i class="fa-solid fa-chevron-left"></i>
                  <Button text="Today" onClick={() => {}} />
                  <i class="fa-solid fa-chevron-right"></i>
                </div>

                <div className="toolbar-center">
                  <button
                    className={`view-btn ${selectedView === 'Day' ? 'active' : ''}`}
                    onClick={() => setSelectedView('Day')}
                  >
                    Day
                  </button>
                  <Button text="Week" onClick={() => setSelectedView('Week')} />
                  <button
                    className={`view-btn ${selectedView === 'Month' ? 'active' : ''}`}
                    onClick={() => setSelectedView('Month')}
                  >
                    Month
                  </button>
                  <button
                    className={`view-btn ${selectedView === 'Year' ? 'active' : ''}`}
                    onClick={() => setSelectedView('Year')}
                  >
                    Year
                  </button>
                </div>

                <div className="toolbar-right">
                  <SearchView placeholder="Search" />
                </div>
              </div>

              <div className="calendar-grid">
                {['7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM'].map((slot) => (
                  <div key={slot} className="time-row">
                    <span className="time-label">{slot}</span>
                    {renderTimeBlocks(slot)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Calendar;
