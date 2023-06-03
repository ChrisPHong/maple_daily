import React, { useState, useEffect } from "react";

const WeeklyCountDown = ({ props }) => {
  const [timer, setTimer] = useState(0);
  const [restartTimer, setRestartTimer] = useState(false);

  const desiredDay = props.day;
  const length = props.length;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const nextReset = getNextResetTime().getTime();
      let remainingTime = nextReset - now;

      if (remainingTime < 0) {
        remainingTime = getNextResetTime().getTime() - now;
        setRestartTimer(true);
      }
      setTimer(remainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [restartTimer]);

  useEffect(() => {
    if (timer <= 0) {
      setRestartTimer(true);
    }
  }, [timer]);

  const getNextResetTime = () => {
    const now = new Date();
    const nextReset = new Date(now.getTime());
    nextReset.setUTCFullYear(now.getUTCFullYear());
    nextReset.setUTCMonth(now.getUTCMonth());
    // nextReset.setUTCDate(now.getUTCDate() + length);
    nextReset.setUTCHours(0);
    nextReset.setUTCMinutes(0);
    nextReset.setUTCSeconds(0);
    nextReset.setUTCMilliseconds(0);
    // Set the desired day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    // const desiredDay = 0; // Sunday

    nextReset.setUTCDate(
      now.getUTCDate() + ((desiredDay + 7 - now.getUTCDay()) % 7)
    );
    nextReset.setUTCHours(0, 0, 0, 0);

    return nextReset;
  };

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    if (days <= 0) {
      return (
        <span style={{ color: "red", fontWeight: "bold" }}>
          {`${days} D ${hours.toString().padStart(2, "0")} H ${minutes
            .toString()
            .padStart(2, "0")}
          M ${seconds.toString().padStart(2, "0")} S`}
        </span>
      );
    } else {
      return (
        <span style={{ color: "black ", fontWeight: "bold" }}>
          {`${days} D ${hours.toString().padStart(2, "0")} H ${minutes
            .toString()
            .padStart(2, "0")} M ${seconds.toString().padStart(2, "0")} S`}
        </span>
      );
    }
  };

  return (
    <div>
      <span>RESET: </span>
      <span>{formatTime(timer)}</span>
    </div>
  );
};

export default WeeklyCountDown;
