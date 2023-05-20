import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const nextReset = getNextResetTime().getTime();
      const remainingTime = nextReset - now;

      setTimer(remainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      // Timer has reached zero, handle your logic here
      // For example, display a message or trigger an event
    }
  }, [timer]);

  const getNextResetTime = () => {
    const now = new Date();
    const nextReset = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0, // Hour
      0, // Minute
      0, // Second
      0  // Millisecond
    );

    return nextReset;
  };

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days}d ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <span>RESET:   </span>
      <span>{formatTime(timer)}</span>
    </div>
  );
};

export default CountdownTimer;
