import { useEffect } from "react";
import OneTask from "../OneTask";
import DailyCountDown from "../../Timers/DayTimer";
import WeeklyCountDown from "../../Timers/WeeklyTimer";
import "./Tasks.css";

const TasksList = ({ props }) => {
  const WeeklyBosses = Object.values(props?.Weekly?.Boss ?? {});
  const WeeklyQuests = Object.values(props?.Weekly?.Quest ?? {});
  const DailyBossess = Object.values(props?.Daily?.Boss ?? {});
  const DailyQuests = Object.values(props?.Daily?.Quest ?? {});

  useEffect(() => {}, [props]);
  const targetDate = "2023-06-01T00:00:00Z"; // Replace with your desired target UTC date

  return (
    <div className="All-Quests-Container">
      {DailyQuests.length > 0 ? (
        <div className="DQ-Timer-Container">
          <div className="Task-title-task-container">
            <div className="tasks-title">Daily Quests</div>
            <div>
              <DailyCountDown props={{ length: 1 }} />
            </div>
            {DailyQuests.map((task) => {
              return (
                <div key={task.id}>
                  <OneTask task={task} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {DailyBossess.length > 0 ? (
        <div className="DQ-Timer-Container">
          <div className="Task-title-task-container">
            <div className="tasks-title">Daily Bosses</div>
            <div>
              <DailyCountDown props={{ length: 1 }} />
            </div>
            {DailyBossess.map((task) => {
              return (
                <div key={task.id}>
                  <OneTask task={task} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {WeeklyBosses.length > 0 ? (
        <div className="DQ-Timer-Container">
          <div className="Task-title-task-container">
            <div className="tasks-title">Weekly Bosses</div>
            <div>
              <WeeklyCountDown props={{ day: 4, length: 7 }} />
            </div>
            {WeeklyBosses.map((task) => {
              return (
                <div key={task.id}>
                  <OneTask task={task} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {WeeklyQuests.length > 0 ? (
        <div className="DQ-Timer-Container">
          <div className="Task-title-task-container">
            <div className="tasks-title">Weekly Quests</div>
            <div>
              <WeeklyCountDown props={{ day: 0 }} />
            </div>
            {WeeklyQuests.map((task) => {
              return (
                <div key={task.id}>
                  <OneTask task={task} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TasksList;
