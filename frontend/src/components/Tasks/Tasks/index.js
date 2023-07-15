import { useEffect } from "react";
import OneTask from "../OneTask";
import DailyCountDown from "../../Timers/DayTimer";
import WeeklyCountDown from "../../Timers/WeeklyTimer";
import "./Tasks.css";
import { useState } from "react";

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

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (idx) => {
    setToggleState(idx);
  };
  useEffect(() => {}, [props]);

  return (
    // <div className="All-Quests-Container">
    //   <div className="List-Tasks-Container">
    //     <div className="top-list-div">
    //       <div className="tasks-title">Daily Quests</div>
    //       <DailyCountDown props={{ length: 1 }} />
    //     </div>
    //     <div className="quests-container">
    //       <div className="mini-tasks-container">
    //         <div className="title-mini-tasks">TO DO</div>
    //         {taskDisplay(DailyQuestsInComplete)}
    //       </div>
    //       <div className="mini-tasks-container">
    //         <div className="title-mini-tasks">FINISHED</div>
    //         {taskDisplay(DailyQuestsComplete)}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="List-Tasks-Container">
    //     <div className="top-list-div">
    //       <div className="tasks-title">Daily Bosses</div>
    //       <DailyCountDown props={{ length: 1 }} />
    //     </div>
    //     <div className="quests-container">
    //       <div className="mini-tasks-container">
    //         <div className="title-mini-tasks">TO DO</div>
    //         {taskDisplay(DailyBossInComplete)}
    //       </div>
    //       <div className="mini-tasks-container">
    //         <div className="title-mini-tasks">FINISHED</div>
    //         {taskDisplay(DailyBossComplete)}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="List-Tasks-Container">
    //     <div className="top-list-div">
    //       <div className="tasks-title">Weekly Bosses</div>
    //       <WeeklyCountDown props={{ day: 4, length: 7 }} />
    //     </div>
    //     <div className="quests-container">
    //       <div className="mini-tasks-container">
    //         <div className="title-mini-tasks">Incomplete</div>
    //         {taskDisplay(WeeklyBossesInComplete)}
    //       </div>
    //       <div className="mini-tasks-container">
    //         <div className="title-mini-tasks">Complete</div>
    //         {taskDisplay(WeeklyBossesComplete)}
    //       </div>
    //     </div>
    //   </div>

    //   <div className="List-Tasks-Container">
    //     <div className="top-list-div">
    //       <div className="tasks-title">Weekly Quests</div>
    //       <WeeklyCountDown props={{ day: 0 }} />
    //     </div>
    //     <div className="quests-container">
    //       <div className="mini-tasks-container">
    //         <div className="title-mini-tasks">InComplete</div>
    //         {taskDisplay(WeeklyQuestsInComplete)}
    //       </div>
    //       <div className="mini-tasks-container">
    //         <div className="title-mini-tasks">Complete</div>
    //         {taskDisplay(WeeklyQuestsComplete)}
    //       </div>
    //     </div>
    //   </div>

    <div className="container">
      <div className="bloc-tabs">
        <button
          className={
            toggleState === 1 ? "tabs active-tabs left-tab" : "tabs left-tab"
          }
          onClick={() => toggleTab(1)}
        >
          Daily Quests
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Daily Bosses
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Weekly Bosses
        </button>
        <button
          className={toggleState === 4 ? "tabs active-tabs right-tab" : "tabs right-tab"}
          onClick={() => toggleTab(4)}
        >
          Weekly Quests
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <h2>
            <DailyCountDown props={{ length: 1 }} />
          </h2>
          <div className="quests-container">
            {DailyQuestsInComplete.length === 0 &&
            DailyQuestsComplete.length === 0 ? (
              <div className="No-tasks-div">No Tasks</div>
            ) : (
              <>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">NEED TO DO</div>
                  {taskDisplay(DailyQuestsInComplete)}
                </div>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">FINISHED</div>
                  {taskDisplay(DailyQuestsComplete)}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>
            <DailyCountDown props={{ length: 1 }} />
          </h2>

          <div className="quests-container">
            {DailyBossInComplete.length === 0 &&
            DailyBossComplete.length === 0 ? (
              <div className="No-tasks-div">No Tasks</div>
            ) : (
              <>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">TO DO</div>
                  {taskDisplay(DailyBossInComplete)}
                </div>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">FINISHED</div>
                  {taskDisplay(DailyBossComplete)}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <h2>
            <WeeklyCountDown props={{ day: 4, length: 7 }} />
          </h2>

          <div className="quests-container">
            {WeeklyBossesInComplete.length === 0 &&
            WeeklyBossesComplete.length === 0 ? (
              <div className="No-tasks-div">No Tasks</div>
            ) : (
              <>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">Incomplete</div>
                  {taskDisplay(WeeklyBossesInComplete)}
                </div>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">Complete</div>
                  {taskDisplay(WeeklyBossesComplete)}
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <h2>
            <WeeklyCountDown props={{ day: 0 }} />
          </h2>

          <div className="quests-container">
            {WeeklyQuestsInComplete.length === 0 &&
            WeeklyQuestsComplete.length === 0 ? (
              <div className="No-tasks-div">No Tasks</div>
            ) : (
              <>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">InComplete</div>
                  {taskDisplay(WeeklyQuestsInComplete)}
                </div>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">Complete</div>
                  {taskDisplay(WeeklyQuestsComplete)}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default TasksList;
