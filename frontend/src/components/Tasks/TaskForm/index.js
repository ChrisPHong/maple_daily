import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../../store/list";
import "./TaskForm.css";

const TaskForm = ({ props }) => {
  const [obj, setObj] = useState("");
  const [category, setCatgeory] = useState("Quest");
  const [resetTime, setResetTime] = useState("Daily");
  const [error, setError] = useState([]);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const errors = [];
    if (obj.length === 0 || obj.trim() === "")
      errors.push("Provide a Name for Your Objective");

    setError(errors);
  }, [obj]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (error.length > 0) {
      setShow(true);
      return;
    }
    const payload = {
      ...props,
      objective: obj,
      resetTime: resetTime,
      category: category,
    };
    await dispatch(createTask(payload));
  };
  return (
    <div>
      <form className="Overall-Task-Form-Container">
        <div className="Task-Form-Container">
          {show
            ? error.map((error, idx) => {
                return (
                  <div style={{ color: "red", fontWeight: "bold" }} key={idx}>
                    {error}
                  </div>
                );
              })
            : null}
          <label className="label-task-form">
            Objective:
            <input
              className="input-task-form"
              placeholder="Write Your Daily Tasks"
              onChange={(e) => {
                setObj(e.target.value);
              }}
            ></input>
          </label>
          <div className="select-div-task">
            <label className="label-task-form">
              Frequency:
              <select
                value={resetTime}
                onChange={(e) => {
                  setResetTime(e.target.value);
                }}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </label>
            <label className="label-task-form">
              Type:
              <select
                value={category}
                onChange={(e) => {
                  setCatgeory(e.target.value);
                }}
              >
                <option value="Quest">Quest</option>
                <option value="Boss">Boss</option>
              </select>
            </label>
          </div>
        </div>
        <button className="task-submit-btn" onClick={onSubmit}>
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
