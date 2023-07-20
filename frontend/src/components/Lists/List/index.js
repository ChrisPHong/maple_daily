import { useSelector, useDispatch } from "react-redux";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import ConfirmationBoxModal from "../../ConfirmationBoxModal";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";
import { getOneList, updateList } from "../../../store/list.js";
import Loading from "../../Loading";
import TaskFormModal from "../../Modals/TaskFormModal";
import "./List.css";

const List = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const list = useSelector((state) => state?.listReducer?.list)[0];
  const params = useParams();
  const { listId } = params;
  const dispatch = useDispatch();
  const history = useHistory();

  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (userId) {
      const payload = { listId, userId };
      dispatch(getOneList(payload));
    }
  }, [dispatch, userId]);

  const updateInfo = async () => {
    const payload = {
      character: list.character,
      id: Number(listId),
    };

    await setShowLoading(true);
    await dispatch(updateList(payload));
    await setShowLoading(false);
  };

  return showLoading ? (
    <Loading />
  ) : (
    <div className="list-container">
      {list ? (
        <div className="OneProfile-Container">
          <div className="OneCharacter-Container">
            <div className="image-backdrop">
              <img className="image-character" src={list?.apiContent} />
            </div>
            <div className="overall-character-info-div">
              <div className="characterInfo-container">
                <div className="ListTitle">{list?.name?.toUpperCase()}</div>
                <span className="character-info-data">
                  Character Name: {list?.character}
                </span>
                <span className="character-info-data">
                  Class: {list?.characterClass}
                </span>
                <span className="character-info-data">
                  level: {list?.level}
                </span>
                <span className="character-info-data">
                  Server: {list?.server}
                </span>
              </div>
              <div className="list-multi-purpose-container">
                <button
                  className="update-btn"
                  onClick={() => {
                    updateInfo();
                  }}
                >
                  Update
                </button>
                <ConfirmationBoxModal id={list?.id} />
              </div>
            </div>
          </div>
          <TaskFormModal listId={list.id} userId={userId} />
          <div className="tasks-container">
            {list?.Tasks ? <TasksList props={list?.Tasks} /> : <></>}
          </div>
          <button
            className="edit-list-button"
            onClick={() => {
              history.push(`/lists/${list?.id}/edit`);
            }}
          >
            Edit List
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default List;
