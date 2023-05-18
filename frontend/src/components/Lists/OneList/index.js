import { fetchTasks } from "../../../store/list.js";
import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect } from "react";

const OneList = ({ props }) => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if(props.id) dispatch(fetchTasks({ listId: props.id }));
  }, [props]);


  return (
    <div>
      <DeleteList id={props.id} />
      <div>
      <TaskForm props={{ listId: props.id, userId }} />
      </div>
      <img src={props.apiContent} />
      <div>{props.characterClass}</div>
      <div>{props.character}</div>
      <div>{props.level}</div>
      <div>{props.server}</div>
      {props.name}
      <TasksList  />
    </div>
  );
};

export default OneList;
