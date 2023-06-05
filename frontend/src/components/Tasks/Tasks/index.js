import { useEffect } from "react";
import OneTask from "../OneTask";
import DailyCountDown from "../../Timers/DayTimer";
import WeeklyCountDown from "../../Timers/WeeklyTimer";
import "./Tasks.css";

const TasksList = ({ props }) => {
  // Weekly Bosses
  const WeeklyBossesInComplete = Object.values(
    props?.Weekly?.Boss?.incomplete ?? {}
  );
  const WeeklyBossesComplete = Object.values(
    props?.Weekly?.Boss?.complete ?? {}
  );

  // Weekly Quests
  const WeeklyQuestsInComplete = Object.values(
    props?.Weekly?.Quest?.incomplete ?? {}
  );
  const WeeklyQuestsComplete = Object.values(
    props?.Weekly?.Quest?.complete ?? {}
  );

  // Daily Quests
  const DailyQuestsInComplete = Object.values(
    props?.Daily?.Quest?.incomplete ?? {}
  );
  const DailyQuestsComplete = Object.values(
    props?.Daily?.Quest?.complete ?? {}
  );
  // Daily Bosses
  const DailyBossInComplete = Object.values(
    props?.Daily?.Boss?.incomplete ?? {}
  );
  const DailyBossComplete = Object.values(props?.Daily?.Boss?.complete ?? {});

  const taskDisplay = (arr) => {
    const tasks = arr.map((task) => {
      return (
        <div key={task.id}>
          <OneTask task={task} />
        </div>
      );
    });
    return tasks;
  };

  useEffect(() => {}, [props]);

  return (
    <div className="All-Quests-Container">
      {DailyQuestsComplete.length > 0 || DailyQuestsInComplete.length > 0 ? (
        <div className="List-Tasks-Container">
          <div className="tasks-title">Daily Quests</div>
          <DailyCountDown props={{ length: 1 }} />
          <div className="quests-container">
            <div className="mini-tasks-container">
              <div className="title-mini-tasks">TO DO</div>
              {taskDisplay(DailyQuestsInComplete)}
            </div>
            <div className="mini-tasks-container">
              <div className="title-mini-tasks">FINISHED</div>
              {taskDisplay(DailyQuestsComplete)}
            </div>
          </div>
        </div>
      ) : null}
      {DailyBossInComplete.length > 0 || DailyBossComplete.length > 0 ? (
        <div className="List-Tasks-Container">
          <div className="tasks-title">Daily Bosses</div>
          <DailyCountDown props={{ length: 1 }} />
          <div className="quests-container">
            <div className="mini-tasks-container">
              <div className="title-mini-tasks">TO DO</div>
              {taskDisplay(DailyBossInComplete)}
            </div>
            <div className="mini-tasks-container">
              <div className="title-mini-tasks">FINISHED</div>
              {taskDisplay(DailyBossComplete)}
            </div>
          </div>
        </div>
      ) : null}
      {WeeklyBossesComplete.length > 0 || WeeklyBossesInComplete.length > 0 ? (
        <div className="List-Tasks-Container">
          <div className="tasks-title">Weekly Bosses</div>
          <WeeklyCountDown props={{ day: 4, length: 7 }} />
          <div className="quests-container">
            <div className="mini-tasks-container">
              <div className="title-mini-tasks">Incomplete</div>
              {taskDisplay(WeeklyBossesInComplete)}
            </div>
            <div className="mini-tasks-container">
              <div className="title-mini-tasks">Complete</div>
              {taskDisplay(WeeklyBossesComplete)}
            </div>
          </div>
        </div>
      ) : null}
      {WeeklyQuestsInComplete.length > 0 || WeeklyQuestsComplete.length > 0 ? (
        <div className="List-Tasks-Container">
          <div className="tasks-title">Weekly Quests</div>
          <WeeklyCountDown props={{ day: 0 }} />
          <div className="quests-container">
            <div className="mini-tasks-container">
              <div className="title-mini-tasks">InComplete</div>
              {taskDisplay(WeeklyQuestsInComplete)}
            </div>
            <div className="mini-tasks-container">
              <div className="title-mini-tasks">Complete</div>
              {taskDisplay(WeeklyQuestsComplete)}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TasksList;
