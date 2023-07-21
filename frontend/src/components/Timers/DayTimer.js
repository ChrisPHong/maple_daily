import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetDailyTasks, getUserLists } from "../../store/list";

const DailyCountDown = ({ props }) => {
  const [timer, setTimer] = useState(0);
  const [restartTimer, setRestartTimer] = useState(false);

  const { length } = props;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.session?.user?.id);
  // const length = 0;
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date().getTime();
      const nextReset = getNextResetTime().getTime();
      let remainingTime = nextReset - now;

      if (remainingTime <= 0) {
        await dispatch(resetDailyTasks({ userId }));
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
    const nextReset = new Date();
    nextReset.setUTCFullYear(now.getUTCFullYear());
    nextReset.setUTCMonth(now.getUTCMonth());
    nextReset.setUTCDate(now.getUTCDate() + length);
    nextReset.setUTCHours(0);
    nextReset.setUTCMinutes(0);
    nextReset.setUTCSeconds(0);
    nextReset.setUTCMilliseconds(0);

    return nextReset;
  };

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    if (hours <= 3) {
      return (
        <span className="text-pink-600 font-bold">
          {`${hours.toString().padStart(2, "0")} H ${minutes
            .toString()
            .padStart(2, "0")} M ${seconds.toString().padStart(2, "0")} S`}
        </span>
      );
    } else {
      return (
        <span
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          {`${hours.toString().padStart(2, "0")} H  ${minutes
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

export default DailyCountDown;
