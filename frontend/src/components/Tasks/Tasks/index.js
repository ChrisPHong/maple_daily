import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneTask from "../OneTask";

const TasksList = ({ props }) => {
  const tasks = Object.values(props);
  useEffect(() => {}, []);
  
  return (
    <div>
      {tasks.map((task) => {
        return (
          <div key={task.id}>
            <OneTask task={task}/>

          </div>
        );
      })}
    </div>
  );
};

export default TasksList;
