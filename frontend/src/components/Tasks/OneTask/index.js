import {  useState } from "react";
import { useDispatch, } from "react-redux";
import { Trash2 } from 'lucide-react';
import { deleteTask, editTask } from "../../../store/list";
import "./OneTask.css";

const OneTask = ({ task, completed }) => {
  const dispatch = useDispatch();

  const onDelete = async (taskId) => {
    await dispatch(deleteTask({ taskId }));
  };

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.objective);
  const [complete, setComplete] = useState(task.completed);
  const [showBtn, setShowBtn] = useState(true);

  const handleMouse = () => {
    setShowBtn(!showBtn);

  };

  const handleClick = () => {
    if (!editing) {
      setEditing(true);
    }
  };

  const handleBlur = async () => {
    setEditing(false);
    task.objective = text;
    await dispatch(editTask(task));
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleCompleted = () => {
    setComplete(!complete);
  };

  const handleCheckboxChange = async () => {
    setComplete(!complete);
    task.completed = !complete;
    await dispatch(editTask(task));
  };


  const iconColor = showBtn ? 'white' : 'red'; 

  return (
    <div className="task-container">
      <div className="check-task-container">

        <input
          onClick={() => {
            handleCompleted();
          }}
          type="checkbox"
          checked={complete}
          className="custom-checkbox "
          onChange={handleCheckboxChange}
        />

        {editing ? (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          ></input>
        ) : (
          <span
            className={`${completed === "completed" ? "line-through" : ""
              } ml-2 text-white`}
            onClick={handleClick}
          >
            {task.objective}
          </span>
        )}
      </div>

      <Trash2 size={20}
        color={iconColor}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
        className="iconCursor"
        onClick={(e) => {
          e.preventDefault();
          onDelete(task.id);
        }} />
    </div>
  );
};

export default OneTask;
