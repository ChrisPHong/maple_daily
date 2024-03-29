import { useEffect } from "react";
import OneTask from "../OneTask";
import DailyCountDown from "../../Timers/DayTimer";
import ThursdayTimer from "../../Timers/ThursdayTimer";
import "./Tasks.css";
import { useState } from "react";
import SundayTimer from "../../Timers/SundayTimer";
import { resetDailies, resetWeeklies, completeDailies, completeWeeklies } from '../../../store/list';
import { useSelector, useDispatch } from "react-redux";

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

  const taskDisplay = (arr, completed) => {
    const tasks = arr.map((task) => {
      return (
        <div key={task.id}>
          <OneTask task={task} completed={completed} />
        </div>
      );
    });
    return tasks;
  };

  const userId = useSelector((state) => state?.session?.user?.id);
  const listId = useSelector((state) => state?.listReducer?.list?.[0].id);

  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(1);
  const [resetdailyQuest, setResetDailyQuest] = useState(false);
  const toggleTab = (idx) => {
    setToggleState(idx);
  };
  useEffect(() => { }, [props]);

  return (
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
          className={
            toggleState === 3 ? "tabs active-tabs" : "tabs flex-nowrap"
          }
          onClick={() => toggleTab(3)}
        >
          Weekly Bosses
        </button>
        <button
          className={
            toggleState === 4 ? "tabs active-tabs right-tab" : "tabs right-tab"
          }
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
            <div className="flex justify-between items-center">

              <DailyCountDown props={{ length: 1 }} />
              {DailyQuestsInComplete.length === 0 &&
                DailyQuestsComplete.length === 0 ? '' :
                <div className="justify-around">
                  <button className="complete-btn rounded p-2 font-bold m-2"
                    onClick={() => {
                      dispatch(completeDailies({ userId, type: "Quests", listId, complete: true }))
                    }}>
                    Complete Quests
                  </button>
                  <button className="rounded p-2 font-bold reset-btn" onClick={() => {
                    dispatch(resetDailies({ userId, type: "Quests", listId, complete: false }))
                  }}
                  >
                    Reset Daily Quests
                  </button>
                </div>
              }
            </div>
          </h2>
          <div className="quests-container">
            {DailyQuestsInComplete.length === 0 &&
              DailyQuestsComplete.length === 0 ? (
              <div className="No-tasks-div">No Tasks</div>
            ) : (
              <>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">INCOMPLETE</div>
                  {taskDisplay(DailyQuestsInComplete, "incompleted")}
                </div>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">FINISHED</div>
                  {taskDisplay(DailyQuestsComplete, "completed")}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <div className="flex justify-between items-center">

            <DailyCountDown props={{ length: 1 }} />
            {DailyBossInComplete.length === 0 &&
              DailyBossComplete.length === 0 ?
              '' :
              <div>
                <button className="complete-btn rounded p-2 font-bold m-2"
                  onClick={() => {
                    dispatch(completeDailies({ userId, type: "Boss", listId, complete: true }))
                  }}>
                  Complete Bosses
                </button>
                <button className="bg-red-200 rounded p-2 font-bold reset-btn" onClick={() => {
                  dispatch(resetDailies({ userId, type: "Boss", listId, complete: false }))
                }}
                >
                  Reset Daily Bosses
                </button>
              </div>
            }
          </div>

          <div className="quests-container">
            {DailyBossInComplete.length === 0 &&
              DailyBossComplete.length === 0 ? (
              <div className="No-tasks-div">No Tasks</div>
            ) : (
              <>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">INCOMPLETE</div>
                  {taskDisplay(DailyBossInComplete, "incompleted")}
                </div>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">FINISHED</div>
                  {taskDisplay(DailyBossComplete, "completed")}
                </div>
              </>
            )}
          </div>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <div className="flex justify-between items-center">

            <ThursdayTimer />
            {WeeklyBossesInComplete.length === 0 &&
              WeeklyBossesComplete.length === 0 ? '' :
              <div>

                <button className="complete-btn rounded p-2 font-bold m-2"
                  onClick={() => {
                    dispatch(completeWeeklies({ userId, type: "Boss", listId, complete: true }))
                  }}>
                  Complete Bosses
                </button>
                <button className="bg-red-200 rounded p-2 font-bold reset-btn" onClick={() => {
                  dispatch(resetWeeklies({ userId, type: "Boss", listId, complete: false }))
                }}
                >
                  Reset W. Bosses
                </button>
              </div>
            }
          </div>

          <div className="quests-container">
            {WeeklyBossesInComplete.length === 0 &&
              WeeklyBossesComplete.length === 0 ? (
              <div className="No-tasks-div">No Tasks</div>
            ) : (
              <>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">INCOMPLETE</div>
                  {taskDisplay(WeeklyBossesInComplete, "incompleted")}
                </div>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">FINISHED</div>
                  {taskDisplay(WeeklyBossesComplete, "completed")}
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={toggleState === 4 ? "content  active-content" : "content"}
        >
          <div className="flex justify-between items-center">
            <SundayTimer />
            {WeeklyQuestsInComplete.length === 0 &&
              WeeklyQuestsComplete.length === 0 ? '' :
              <div>
                <button className="complete-btn rounded p-2 font-bold m-2"
                  onClick={() => {
                    dispatch(completeWeeklies({ userId, type: "Quests", listId, complete: true }))
                  }}>
                  Complete Quests
                </button>
                <button className="bg-red-200 rounded p-2 font-bold reset-btn" onClick={() => {
                  dispatch(resetWeeklies({ userId, type: "Quests", listId, complete: false }))
                }}
                >
                  Reset W. Quests
                </button>
              </div>
            }
          </div>

          <div className="quests-container">
            {WeeklyQuestsInComplete.length === 0 &&
              WeeklyQuestsComplete.length === 0 ? (
              <div className="No-tasks-div">No Tasks</div>
            ) : (
              <>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">INCOMPLETE</div>
                  {taskDisplay(WeeklyQuestsInComplete, "incompleted")}
                </div>
                <div className="mini-tasks-container">
                  <div className="title-mini-tasks">FINISHED</div>
                  {taskDisplay(WeeklyQuestsComplete, "completed")}
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
