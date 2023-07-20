import React, { useState, useEffect } from "react";

const SundayTimer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const nextReset = getNextSunday5PM().getTime();
      let remainingTime = nextReset - now;

      if (remainingTime <= 0) {
        // If the remaining time is less than zero, set it to zero to prevent negative values
        remainingTime = 0;
      }
      setTimer(remainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getNextSunday5PM = () => {
    const now = new Date();
    const nextReset = new Date(now.getTime());

    // Set the desired day of the week (0: Sunday)
    const desiredDay = 0;

    // Calculate the number of days until the next Sunday
    const daysUntilNextSunday = (desiredDay + 7 - now.getUTCDay()) % 7;

    // Set the next reset time to Sunday at 5 PM UTC
    nextReset.setUTCFullYear(now.getUTCFullYear());
    nextReset.setUTCMonth(now.getUTCMonth());
    nextReset.setUTCDate(now.getUTCDate() + daysUntilNextSunday);
    nextReset.setUTCHours(17, 0, 0, 0);

    // If the next reset time is earlier than the current time, add 7 days to set it to the next week
    if (nextReset.getTime() <= now.getTime()) {
      nextReset.setUTCDate(nextReset.getUTCDate() + 7);
    }

    return nextReset;
  };

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return (
      <span
        className={`${days < 3 ? "text-pink-600 " : "font-bold"} font-bold`}
      >
        {`${days} D ${hours.toString().padStart(2, "0")} H ${minutes
          .toString()
          .padStart(2, "0")} M ${seconds.toString().padStart(2, "0")} S`}
      </span>
    );
  };

  return (
    <div>
      <span>RESET: </span>
      <span>{formatTime(timer)}</span>
    </div>
  );
};

export default SundayTimer;
