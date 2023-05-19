import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect, useState } from "react";
import "./OneList.css";
const OneList = ({ props }) => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {}, [props]);

  return (
    <div className="OneList-container">
      <div></div>
      <div>Completed Todays Dailies: {`${props.completed}`}</div>
      <img src={props.apiContent} />
      <DeleteList id={props.id} />
      <div>{props.character}</div>
      <div>Class: {props.characterClass}</div>
      <div>level: {props.level}</div>
      <div>Server: {props.server}</div>
      <div>{props.name}</div>
      {/* <button>{checkAll ? 'Check All Dailies' : "Uncheck All Dailies"}</button> */}
      <TaskForm props={{ listId: props.id, userId }} />
      {props.Tasks ? <TasksList props={props?.Tasks} /> : <></>}
    </div>
  );
};

export default OneList;
