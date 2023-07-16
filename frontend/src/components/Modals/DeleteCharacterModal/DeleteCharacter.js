import { useState } from "react";
import { deletingDashboardList } from "../../../store/list";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DeleteCharacter = ({
  id,
  closeModal,
  lists,
  setShowModal,
  showModal,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [chosen, setChosen] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (chosen.length < 1) return;
    await dispatch(deletingDashboardList(chosen[0]));
    await setShowModal(false);
    await history.push("/");
  };
  return (
    <>
      {lists?.map((list, idx) => {
        return (
          <div
            key={list.character}
            className="draggable character-drag-container"
            onClick={(e) => {
              console.log(list, "<<<<<<<<<< what is this list");
              e.preventDefault();
              setChosen([list]);
            }}
          >
            <span className="drag-list-name">{list.character}</span>
            <div
              style={{ backgroundImage: `url(${list.apiContent})` }}
              className="characterImage-drag"
            ></div>
          </div>
        );
      })}
      <button
        onClick={async (e) => {
          await onSubmit(e);
          //   await closeModal(false);
        }}
      >
        Delete X
      </button>
    </>
  );
};

export default DeleteCharacter;
