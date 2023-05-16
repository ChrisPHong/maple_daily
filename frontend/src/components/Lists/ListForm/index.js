import { useState, useEffect } from "react";
import { createListForm, getUserLists} from "../../../store/list.js";
import { useDispatch, useSelector} from "react-redux";


const ListForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [character, setCharacter] = useState("");
  const userId = useSelector((state) => state.session.user?.id);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, character, userId };
    await dispatch(createListForm(payload));
    await dispatch(getUserLists({userId}))
  };

  useEffect(() => {
}, [dispatch]);
  return (
    <>
      <form>
        <label>
          List Name
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </label>
        <label>
          character
          <input
            onChange={(e) => {
                setCharacter(e.target.value);
            }}
          ></input>
        </label>
        <button onClick={onSubmit}>Submit</button>
      </form>
    </>
  );
};

export default ListForm;
