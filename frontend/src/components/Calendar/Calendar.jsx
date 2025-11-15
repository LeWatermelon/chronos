import Button from '../ui/Button/Button';
import SearchView from '../ui/SearchView/SearchView';
import CalendarSidebar from '../LeftSide/LeftSide';
import BigCalendar from '../BigCalendar/BigCalendar';
import React, { useState } from 'react';
import './Calendar.css';

import WeekView from '../BigCalendar/WeekCalendar'
import DayView from '../BigCalendar/DayCalendar'
import MonthView from '../BigCalendar/MonthCalendar'
import YearView from '../BigCalendar/YearCalendar'

export default function Calendar() {
  const [view, setSelectedView] = useState('Week');
  const [currentDate, setCurrentDate] = useState(new Date());

  const [currentInfo, setCurrentInfo] = useState({
    year: null,
    month: null,
    day: null
  });

  const renderView = () => {
    const commonProps = { onDateChange: setCurrentInfo, currentDate };
    switch (view) {
      case "Day":
        return <DayView {...commonProps} />;
      case "Month":
        return <MonthView {...commonProps} />;
      case "Year":
        return <YearView {...commonProps} />;
      case "Week":
      default:
        return <WeekView {...commonProps} />;
    }
  };

const handlePrev = () => {
  switch(view) {
    case 'Day':
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 1));
      break;
    case 'Week':
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 7));
      break;
    case 'Month':
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDate()));
      break;
    case 'Year':
      setCurrentDate(prev => new Date(prev.getFullYear() - 1, prev.getMonth(), prev.getDate()));
      break;
  }
};

const handleNext = () => {
  switch(view) {
    case 'Day':
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 1));
      break;
    case 'Week':
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 7));
      break;
    case 'Month':
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDate()));
      break;
    case 'Year':
      setCurrentDate(prev => new Date(prev.getFullYear() + 1, prev.getMonth(), prev.getDate()));
      break;
  }
};


const handleDayClick = (day) => {
  onDateChange(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
};

  return (
    <>
      {/* <Helmet>
        <title>Weekly Calendar View | Calendar Pro</title>
      </Helmet> */}
        <div className="calendar-main">
          <div className="calendar-layout">
            <CalendarSidebar />

            <div className="calendar-content">

              <div className="calendar-toolbar">
                  <Button text="Today" onClick={() => {}} />
                <div className="toolbar-left">
                  <i className="fa-solid fa-chevron-left calendar-arrow" onClick={() => handlePrev()}></i>
                  <i className="fa-solid fa-chevron-right calendar-arrow" onClick={() => handleNext()}></i>
                </div>
                
                <span>
                  {currentInfo.year && currentInfo.month !== null
                    ? `${currentInfo.day ? currentInfo.day + " " : ""}${currentInfo.month + 1}/${currentInfo.year}`
                    : "Loading..."}
                </span>
                <div className="toolbar-center">
                  <Button text="Day" onClick={() => setSelectedView('Day') } />
                  <Button text="Week" onClick={() => setSelectedView('Week')} />
                  <Button text="Month" onClick={() => setSelectedView('Month')} />
                  <Button text="Year" onClick={() => setSelectedView('Year')} />
                </div>

                <div className="toolbar-right">
                  <SearchView placeholder="Search" />
                </div>
              </div>
              <div className="big-calendar">
                {/* <BigCalendar view={view}> */}
                 <BigCalendar>
                  {renderView()}
                </BigCalendar>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};