import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import bgImage from "./images/Character-Select-V2.jpg";
import UsersLists from "../Lists/index";
import "./OneList.css";
import { getOneList } from "../../../store/list.js";
const OneList = ({ props }) => {
  const userId = useSelector((state) => state?.session?.user?.id);

  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {}, [props]);
  console.log(props.Tasks, "in the OneList");
  // {/* <div>Completed Todays Dailies: {`${props.completed}`}</div> */}
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
