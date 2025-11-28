import { useEffect, useState } from 'react';

export default function CurrentTimeLine({ startHour = 0, endHour = 24, hourHeight = 72, offsetTop = 20 }) {
  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalHours = hours + minutes / 60;
      
      // позиция относительно контейнера часов
      const position = (totalHours - startHour) * hourHeight + offsetTop;
      setTopPosition(position);
    };

    updatePosition();
    const interval = setInterval(updatePosition, 60000);
    return () => clearInterval(interval);
  }, [startHour, hourHeight, offsetTop]);

  return (
    <div className="current-time-line-container" style={{ 
      position: 'relative', 
      width: '100%', 
      marginLeft: '3.3rem',
      // overflowX: 'hidden'
      }}
    >
      <div
        className="current-time-line"
        style={{
          position: 'absolute',
          top: `${topPosition + 0.5}px`, // исправлено
          // left: '6%',
          left: '11px',
          right: '53px',        // линия не выходит за правый край
          height: '3px',   // чуть толще
          backgroundColor: 'red',
          zIndex: 20,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: `${topPosition - 4}px`, // исправлено
          // left: '5%',
          left: 0,
          width: 0,
          height: 0,
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: '12px solid red', // треугольник слева
          zIndex: 25,
        }}
      />
    </div>
  );
}
