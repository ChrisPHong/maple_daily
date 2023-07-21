import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetWeeklyBosses } from "../../store/list";

const ThursdayTimer = () => {
  const [timer, setTimer] = useState(0);
  const userId = useSelector((state) => state?.session?.user?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date().getTime();
      const nextReset = getNextThursday5PM().getTime();
      let remainingTime = nextReset - now;

      if (remainingTime <= 0) {
        // If the remaining time is less than zero, set it to zero to prevent negative values
        await dispatch(resetWeeklyBosses({ userId, type: "Bosses" }));
        remainingTime = 0;
      }
      setTimer(remainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getNextThursday5PM = () => {
    const now = new Date();
    const nextReset = new Date(now.getTime());

    // Set the desired day of the week (4: Thursday)
    const desiredDay = 4;

    // Calculate the number of days until the next Thursday
    const daysUntilNextThursday = (desiredDay + 7 - now.getUTCDay()) % 7;

    // Set the next reset time to Thursday at 5 PM UTC
    nextReset.setUTCFullYear(now.getUTCFullYear());
    nextReset.setUTCMonth(now.getUTCMonth());
    nextReset.setUTCDate(now.getUTCDate() + daysUntilNextThursday);
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
      <span className={`${days < 3 ? "text-pink-600 " : " "} font-bold`}>
        {`${days} D ${hours.toString().padStart(2, "0")} H ${minutes
          .toString()
          .padStart(2, "0")} M ${seconds.toString().padStart(2, "0")} S`}
      </span>
    );
  };

  return (
    <div className="flex flex-row ">
      <span className="mr-2">RESET: </span>
      <span>{formatTime(timer)}</span>
    </div>
  );
};

export default ThursdayTimer;
