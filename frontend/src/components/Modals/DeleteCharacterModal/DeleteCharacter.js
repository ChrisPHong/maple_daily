import { useEffect, useState } from "react";
import { deletingDashboardList } from "../../../store/list";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './deleteCharacter.css'

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
    <div className="flex flex-col justify-center items-center">
      <button className="cancel-drag-btn"
        onClick={async (e) => {
          e.preventDefault()
          await setShowModal(false)
        }}>X</button>
      {chosen.length > 0 ?
        <div className={chosen.length > 0 ? "flex flex-col justify-center items-center bg-white p-4 rounded-md mb-3" : ''} >
          <div className="font-bold">
            You've selected <span className="font-bold underline">
              {`${chosen[0]?.character} `}
            </span>
            to be deleted
          </div>
          <div
            key={chosen[0]?.character}
            className={`flex flex-row bg-blue-300 justify-between bg-blue-600
            pl-5 items-center border-black border w-72 rounded-sm mt-2`}
          >
            <span className="drag-list-name">{chosen[0]?.character}</span>
            <div
              style={{ backgroundImage: `url(${chosen[0]?.apiContent})` }}
              className="characterImage-drag"
            ></div>
          </div>
        </div>
        : ''}
      <div className="flex flex-col justify-center bg-white p-4 rounded-md">
        <div className="max-h-96 overflow-y-scroll border-black border-2 rounded-lg">
          {lists?.map((list, idx) => {
            return (
              <div
                key={list.character}
                className={`flex flex-row bg-blue-300 justify-between ${chosenId === list.id ? "bg-blue-600" : "bg-blue-300"
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
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteCharacter;
