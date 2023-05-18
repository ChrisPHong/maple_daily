import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../store/task.js";

const TasksList = () => {
  const tasks = useSelector((state) =>state.listReducer.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchTasks({ listId }));
  }, []);

  return (
    <>

    </>
  );
};

export default TasksList;
