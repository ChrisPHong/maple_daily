import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../../store/list";
import "./TaskForm.css";

const TaskForm = ({ listId, userId, setShowModal }) => {
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
      listId,
      userId,
      objective: obj,
      resetTime: resetTime,
      category: category,
    };
    await dispatch(createTask(payload));
    await setShowModal(false);
  };
  return (
    <div>
      <form className="Overall-Task-Form-Container">
        <div className="Task-Form-Container">
          {show
            ? error.map((error, idx) => {
              return (
                <div
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                  key={idx}
                >
                  {error}
                </div>
              );
            })
            : null}
          <label className="font-bold text-white">
            Objective:
            <input
              className="p-4 rounded-md m-2 text-black"
              placeholder="Write Your Task"
              onChange={(e) => {
                setObj(e.target.value);
              }}
            ></input>
          </label>
          <div className="select-div-task">
            <label className="label-task-form my-2 text-white text-s">
              Frequency:
              <select
                className="text-black ml-2"
                value={resetTime}
                onChange={(e) => {
                  setResetTime(e.target.value);
                }}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
              </select>
            </label>
            <label className="label-task-form ml-5 mr-2 my-2 text-white text-s">
              Type:
              <select
                className="text-black ml-2"
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
        <button className="submit-btn mt-5" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
