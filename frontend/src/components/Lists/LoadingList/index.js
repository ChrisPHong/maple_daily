import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkingCharacter } from "../../../store/list";

const LoadingList = () => {
  const [character, setCharacter] = useState("");
  const [error, setError] = useState([]);
  const userId = useSelector((state) => state.session.user?.id);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { userId, character };
    try {
      await dispatch(checkingCharacter(payload));
    } catch (error) {
      console.log(error, "<<<<<<<<<<<< What is the error");
      const { message } = await error.json();
      setError([message]);
    } finally {
      console.log("done with this sequence . . . ");
    }
  };
  return (
    <form>
      <div>Character</div>
      {error ? (
        <div>
          {error.map((show, idx) => {
            return (
              <div key={idx} className="error-container">
                {show}
              </div>
            );
          })}
        </div>
      ) : null}
      <label>
        <input
          onChange={(e) => {
            e.preventDefault();
            setCharacter(e.target.value);
          }}
        />
      </label>
      <button
        onClick={(e) => {
          onSubmit(e);
        }}
      >
        Load Character
      </button>
    </form>
  );
};

export default LoadingList;
