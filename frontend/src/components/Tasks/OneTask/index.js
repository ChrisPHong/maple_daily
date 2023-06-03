import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteTask, editTask } from "../../../store/list";
import "./OneTask.css";

const OneTask = ({ task }) => {
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

  return (
    <div className="task-container">
      <input
        onClick={() => {
          handleCompleted();
        }}
        type="checkbox"
        checked={complete}
        className="custom-checkbox"
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
        <span onClick={handleClick}>{task.objective}</span>
      )}

      <button
        className="task-delete-btn"
        style={{ color: showBtn ? "transparent" : "red" }}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
        onClick={(e) => {
          e.preventDefault();
          onDelete(task.id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default OneTask;
