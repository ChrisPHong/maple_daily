import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteTask, editTask } from "../../../store/list";

const OneTask = ({ task }) => {
  const dispatch = useDispatch();

  const onDelete = async (e) => {
    await dispatch(deleteTask(e));
  };

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.objective);
  const [complete, setComplete] = useState(task.completed);

  const handleClick = () => {
    if (!editing) {
      setEditing(true);
    }
  };

  const handleBlur = async () => {
    setEditing(false);
    task.objective = text;
    task.completed = complete;
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
    task.objective = text;
    task.completed = !complete;
   
    await dispatch(editTask(task));
  };

  return (
    <>
      <input
        onClick={() => {
          handleCompleted();
        }}
        type="checkbox"
        checked={complete}
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
        onClick={() => {
          onDelete(task);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default OneTask;
