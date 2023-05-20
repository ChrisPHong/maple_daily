import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../../store/list";

const TaskForm = ({ props }) => {
  const [obj, setObj] = useState("");
  const [category, setCatgeory] = useState("Quest");
  const [resetTime, setResetTime] = useState("Daily");

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...props,
      objective: obj,
      resetTime: resetTime,
      category: category,
    };
    await dispatch(createTask(payload));
  };
  return (
    <form>
      <label>
        objective
        <input
          onChange={(e) => {
            setObj(e.target.value);
          }}
        ></input>
      </label>
      <label>
        How Often?
        <select value={resetTime}
          onChange={(e) => {
            setResetTime(e.target.value);
          }}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
      </label>
      <label>
        What Type?
        <select value={category}
          onChange={(e) => {
            setCatgeory(e.target.value);
          }}
        >
          <option value="Quest">Quest</option>
          <option value="Boss">Boss</option>
        </select>
      </label>

      <button onClick={onSubmit}>Submit Task</button>
    </form>
  );
};

export default TaskForm;
