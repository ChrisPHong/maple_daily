import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneTask from "../OneTask";

const TasksList = ({ props }) => {
  const WeeklyBosses = Object.values(props?.Weekly?.Boss);
  const WeeklyQuests = Object.values(props?.Weekly?.Quest);
  const DailyBossess = Object.values(props?.Daily?.Boss);
  const DailyQuests = Object.values(props?.Daily?.Quest);


  useEffect(() => {}, []);

  return (
    <div>
      {DailyQuests.length > 0 ? (
        <div>
          <div>Daily Quests</div>
          {DailyQuests.map((task) => {
            return (
              <div key={task.id}>
                <OneTask task={task} />
              </div>
            );
          })}
        </div>
      ) : null}
      {DailyBossess.length > 0 ? (
        <div>
          <div>Daily Bosses</div>
          {DailyBossess.map((task) => {
            return (
              <div key={task.id}>
                <OneTask task={task} />
              </div>
            );
          })}
        </div>
      ) : null}
      {WeeklyBosses.length > 0 ? (
        <div>
          <div>Weekly Bosses</div>
          {WeeklyBosses.map((task) => {
            return (
              <div key={task.id}>
                <OneTask task={task} />
              </div>
            );
          })}
        </div>
      ) : null}
      {WeeklyQuests.length > 0 ? (
        <div>
          <div>Weekly Quests</div>
          {WeeklyQuests.map((task) => {
            return (
              <div key={task.id}>
                <OneTask task={task} />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default TasksList;
