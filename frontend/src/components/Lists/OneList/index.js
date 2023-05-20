import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect, useState } from "react";
import bgImage from "./images/Character-Select-V2.jpg";
import "./OneList.css";
const OneList = ({ props }) => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {}, [props]);

  return (
    <div className="OneList-container">
      <DeleteList id={props.id} />
      <div className="ListTitle">{props.name.toUpperCase()}</div>
      <div className="Top-OneList-Container">
        {/* <div>Completed Todays Dailies: {`${props.completed}`}</div> */}
        <div className="image-backdrop">
          <img className="image-character" src={props.apiContent} />
        </div>
        <div className="characterInfo-container">
          <label className="character-info-data">
            Character Name: {props.character}
          </label>
          <label className="character-info-data">
            Class: {props.characterClass}
          </label>
          <label className="character-info-data">level: {props.level}</label>
          <label className="character-info-data">Server: {props.server}</label>
        </div>
      </div>
      {/* <button>{checkAll ? 'Check All Dailies' : "Uncheck All Dailies"}</button> */}
      <TaskForm props={{ listId: props.id, userId }} />
      <div className="tasks-container">
      {props.Tasks ? <TasksList props={props?.Tasks} /> : <></>}
      </div>
    </div>
  );
};

export default OneList;
