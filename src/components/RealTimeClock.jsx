import React, { useState, useEffect } from 'react';
import styles from './RealTimeClock.module.css';

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className={styles.clockContainer}>
      <span className={styles.date}>{formattedDate}</span>
      <span className={styles.time}>{formattedTime}</span>
    </div>
  );
};

export default RealTimeClock;
