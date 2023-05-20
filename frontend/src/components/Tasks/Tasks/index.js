import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneTask from "../OneTask";
import "./Tasks.css";

const TasksList = ({ props }) => {
  console.log(props, "<<<<<<<<<<<<")
  const WeeklyBosses = Object.values(props?.Weekly?.Boss ?? {});
  const WeeklyQuests = Object.values(props?.Weekly?.Quest ?? {});
  const DailyBossess = Object.values(props?.Daily?.Boss ?? {});
  const DailyQuests = Object.values(props?.Daily?.Quest ?? {});

  useEffect(() => {}, []);

  return (
    <div>
      {DailyQuests.length > 0 ? (
        <div className="Task-title-task-container">
          <div className="tasks-title">Daily Quests</div>
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
        <div className="Task-title-task-container">
          <div className="tasks-title">Daily Bosses</div>
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
        <div className="Task-title-task-container">
          <div className="tasks-title">Weekly Bosses</div>
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
        <div className="Task-title-task-container">
          <div className="tasks-title">Weekly Quests</div>
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
