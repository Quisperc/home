import { useState, useEffect } from 'react';

export const useTimeCapsule = () => {
  const [time, setTime] = useState({
    year: 0,
    month: 0,
    day: 0,
    week: 0,
    passedDays: 0,
    progress: 0,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - start.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const passed = Math.floor(diff / oneDay);
      const total = (now.getFullYear() % 4 === 0 && now.getFullYear() % 100 !== 0) || now.getFullYear() % 400 === 0 ? 366 : 365;

      setTime({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        week: now.getDay(),
        passedDays: passed,
        progress: Number(((passed / total) * 100).toFixed(1)),
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  return time;
};
