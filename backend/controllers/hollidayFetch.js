import { useState, useEffect } from 'react';

export default function hollidayFetch (contry, year) {
  const [hollidays, setHollidays] = useState([])
  
  let hollidayJson ='https://calendarific.com/api/v2/holidays?&api_key=zfRZoy8pG1q0c8GMHtW7nZe7vdIZ1Nib&country=US&year=2019'
  setHollidays(hollidayJson);
}