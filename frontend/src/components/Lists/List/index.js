import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";
import { getOneList, updateList } from "../../../store/list.js";
import "./List.css";

const List = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const list = useSelector((state) => Object.values(state?.listReducer?.list));
  const params = useParams();
  const { listId } = params;
  const dispatch = useDispatch();
  const history = useHistory();

  const [show, setShow] = useState(false);
  useEffect(() => {
    if (userId) {
      const payload = { listId, userId };
      dispatch(getOneList(payload));
    }
  }, [dispatch, userId]);

  const updateInfo = async () => {
    const payload = {
      character: list[0].character,
      id: listId,
    };
    await dispatch(updateList(payload));
  };

  return (
    <div className="list-container">
      <div>
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          Create Task
        </button>
        <div>{list?.id}</div>
        {show ? <TaskForm props={{ listId: list[0]?.id, userId }} /> : <> </>}
      </div>
      {list.map((list) => {
        return (
          <div className="OneList-container">
            <div className="ListTitle">{list?.name?.toUpperCase()}</div>
            <div className="OneCharacter-Container">
              <div className="image-backdrop">
                <img className="image-character" src={list?.apiContent} />
              </div>
              <div className="characterInfo-container">
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
              <DeleteList id={list?.id} />
              <button
                onClick={() => {
                  history.push(`/lists/${list?.id}/edit`);
                }}
              >
                Add Tasks
              </button>
              <button
                className="update-btn"
                onClick={() => {
                  updateInfo();
                }}
              >
                Update Your Character
              </button>
            </div>
            <div className="tasks-container">
              {list?.Tasks ? <TasksList props={list?.Tasks} /> : <></>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
