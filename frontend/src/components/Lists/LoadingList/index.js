import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkingCharacter } from "../../../store/list";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./LoadingList.css";
import Loading from "../../Loading/index";

const LoadingList = () => {
  const [character, setCharacter] = useState("");
  const [error, setError] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.session.user?.id);

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { userId, character };
    try {
      setLoading(true);
      const response = await dispatch(checkingCharacter(payload));
      const data = await JSON.stringify(response);

      await localStorage.setItem("character", data);
      setLoading(false);
      await history.push("/createList");
    } catch (error) {
      const { message } = await error.json();
      setError([message]);
      setLoading(false);
    }
  };

  useEffect(() => {
    const errors = [];
    if (character.length < 1) error.push("Please put more than one character");
    setError(errors);
    setShow(true);
  }, [character]);
  return (
    <div className="mt-32 flex flex-col justify-center items-center">
      {loading ? <Loading /> : null}
      <form className="border-black flex-row rounded-md border p-6 ">
        {show ? (
          <>
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
          </>
        ) : null}
        <label className="flex flex-row justify-center items-center">
          <div className="mr-4 font-bold">Character Name: </div>
          <input
            placeholder="Type Here ..."
            onChange={(e) => {
              e.preventDefault();
              setCharacter(e.target.value);
            }}
            className="border rounded-md p-2"
          />
        </label>
      </form>
      <button
        className="load-character-btn"
        onClick={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        Load Character
      </button>
    </div>
  );
};

export default LoadingList;
