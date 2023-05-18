import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect } from "react";
import './OneList.css'
const OneList = ({ props }) => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [props]);


  return (
    <div className="OneList-container">
      <div>
      </div>
      <div>
       Completed Todays Dailies: {`${props.completed}`}
      </div>
      <img src={props.apiContent} />
      <DeleteList id={props.id} />
      <div>{props.character}</div>
      <div>Class: {props.characterClass}</div>
      <div>level: {props.level}</div>
      <div>Server: {props.server}</div>
      {props.name}
      <TaskForm props={{ listId: props.id, userId }} />
      <TasksList props={props?.Tasks} />
    </div>
  );
};

export default OneList;
