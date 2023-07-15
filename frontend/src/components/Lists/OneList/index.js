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
    <div className="OneList-container">
      <div className="top-One-List-container">
        <div className="prop-character-div">
          <span className="prop-character-info">
            {props.character.toUpperCase()}
          </span>
        </div>

        <div className="props-characterClass-div">
          <span className="props-characterClass-info">
            {props.characterClass}
          </span>
        </div>
      </div>
      <div className="Top-OneList-Container">
        <div className="characterInfo-container">
          <span className="character-info-data">
            LIST NAME: {props.name ? props.name.toUpperCase() : "None"}
          </span>

          <span className="level-size-container">
            <h1 className="level-size-container">{props.level} </h1> Level
          </span>
          <span className="character-info-data">Server: {props.server}</span>
          <span className="character-info-data">
            {incompleteTasks} Incomplete tasks
          </span>
          <span className="character-info-data">
            {completedTasks} Completed tasks
          </span>
        </div>
      </div>
    </div>
  );
};

export default OneList;
