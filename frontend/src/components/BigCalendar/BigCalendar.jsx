import './BigCalendar.css';

export default function BigCalendar({ children }){
  
  return (
    // <div className="big bg-gray-900 rounded-lg p-4 flex-1 text-white">
    <div className="big">   
      {children}
    </div>
  );
};