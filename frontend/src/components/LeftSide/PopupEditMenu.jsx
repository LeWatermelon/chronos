import './Leftside.css'

export default function EditMenu() {
  return (
    <div
      id={`calendar-menu-${menuCalendarId}`}
      style={{position: 'absolute', zIndex: 1000, marginLeft: '1rem'}}
    >
      <div className="calendar-menu">
        <div 
          className="calendar-menu-item" 
          onClick={(e) => {
            handleEditCalendar(calendar, e);
            setMenuCalendarId(null);
          }}
        >
          Edit calendar
        </div>

        <div 
          className="calendar-menu-item" 
          onClick={(e) => {
            openPopup('invite', e);
            setMenuCalendarId(null); 
          }}
        >
          Invite people
        </div>

        <div 
          className="calendar-menu-item"
          onClick={(e) => {
            openPopup('manage-members', e);
            setMenuCalendarId(null);
          }}
        >
          Manage members
        </div>

        <div 
          className="calendar-menu-item delete"
          onClick={() => handleDeleteCalendar(menuCalendarId)}
        >
          Delete calendar
        </div>
      </div>
    </div>
  )
}