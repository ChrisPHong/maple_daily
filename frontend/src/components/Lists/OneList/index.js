import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect, useState } from "react";
import bgImage from "./images/Character-Select-V2.jpg";
import UsersLists from "../Lists/index";
import "./OneList.css";
const OneList = ({ props }) => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {}, [props]);

  return (
    <div>
      <div className="OneList-container">
        <DeleteList id={props.id} />
        <div className="ListTitle">{props.name.toUpperCase()}</div>
        <div className="Top-OneList-Container">
          {/* <div>Completed Todays Dailies: {`${props.completed}`}</div> */}
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
        {/* <button>{checkAll ? 'Check All Dailies' : "Uncheck All Dailies"}</button> */}
        <TaskForm props={{ listId: props.id, userId, name: props.character }} />
        <div className="tasks-container">
          {props.Tasks ? <TasksList props={props?.Tasks} /> : <></>}
        </div>
      </div>
      <UsersLists />
    </div>
  );
};

export default OneList;
