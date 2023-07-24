import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect } from "react";

import "./OneList.css";

const OneList = ({ props }) => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [incompleteTasks, setInCompleteTasks] = useState(0);
  const countingTasks = (arr) => {
    let completed = 0;
    let needToDo = 0;

    for (let obj of arr) {
      if (obj.completed === true) {
        completed++;
      } else {
        needToDo++;
      }
    }
    setCompletedTasks(completed);
    setInCompleteTasks(needToDo);
    return [needToDo, completed];
  };
  useEffect(() => {
    if (props) countingTasks(props.Tasks);
  }, [props]);
  return (
    <div className="flex flex-col text-white p-2 bg-black bg-opacity-70 rounded">
      <div className="flex flex-col bg-gray-500 bg-opacity-70 pt-3 pb-3 rounded">
        <div className="ml-2">
          <span className="font-bold ml-2">
            {props.character.toUpperCase()}
          </span>
        </div>
        <div className="flex items-end justify-end mr-2">
          <span className="text-xxs mr-2 font-bold">
            {props.characterClass}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-start w-full">
        {/* <div className="bg-black bg-opacity-70 flex flex-col justify-center items-start"> */}
        <span className="ml-2 mt-2 font-bold text-xxs">
          Level {props.level}{" "}
        </span>
        <span className="ml-2  text-xxs">Server: {props.server}</span>
        <span className="ml-2  text-xxs">
          {incompleteTasks} Incomplete tasks
        </span>
        <span className="ml-2  text-xxs">{completedTasks} Completed tasks</span>
      </div>
    </div>
  );
};

export default OneList;
