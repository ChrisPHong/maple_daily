import { useEffect, useState } from "react";
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
  const [chosenId, setChosenId] = useState(0);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (chosen.length < 1) return;
    await dispatch(deletingDashboardList(chosen[0]));
    await setShowModal(false);
    await history.push("/");
  };
  useEffect(() => {
    setChosenId(chosenId);
  }, [chosenId]);
  return (
    <div className="flex flex-col justify-center">
      <div className="max-h-96 overflow-y-scroll border-black border-2 rounded-lg">
        {lists?.map((list, idx) => {
          return (
            <div
              key={list.character}
              className={`flex flex-row bg-blue-300 justify-between ${
                chosenId === list.id ? "bg-blue-600" : "bg-blue-300"
              } pl-5 items-center border-black border hover:cursor-pointer hover:bg-blue-600 w-72`}
              onClick={(e) => {
                e.preventDefault();
                setChosen([list]);
                setChosenId(list.id);
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
      </div>
      <button
        className="p-3 rounded-full border-2 border-black mt-2 text-white font-bold delete-bg"
        onClick={async (e) => {
          await onSubmit(e);
        }}
      >
        Delete X
      </button>
    </div>
  );
};

export default DeleteCharacter;
