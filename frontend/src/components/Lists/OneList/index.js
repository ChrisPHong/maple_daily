import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect } from "react";

import "./OneList.css";

const OneList = ({ props }) => {
  const userId = useSelector((state) => state?.session?.user?.id);

  useEffect(() => {}, [props]);

  return (
    <div>
      <div className="OneList-container">
        <DeleteList id={props.id} />
        <div className="ListTitle">{props.name.toUpperCase()}</div>
        <div className="Top-OneList-Container">
          <div className="image-backdrop">
            <img className="image-character" src={props.apiContent} />
          </div>
          <div className="characterInfo-container">
            <span className="character-info-data">
              Character Name: {props.character}
            </span>
            <span className="character-info-data">
              Class: {props.characterClass}
            </span>
            <span className="character-info-data">level: {props.level}</span>
            <span className="character-info-data">Server: {props.server}</span>
          </div>
        </div>
        <TaskForm props={{ listId: props.id, userId, name: props.character }} />
        <div className="tasks-container">
          {props.Tasks ? <TasksList props={props?.Tasks} /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default OneList;
