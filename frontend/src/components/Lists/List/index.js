import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getOneList } from "../../../store/list.js";
import "./List.css";

const List = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const list = useSelector((state) => Object.values(state?.listReducer?.list));
  const params = useParams();
  const { listId } = params;
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userId) {
      const payload = { listId, userId };
      dispatch(getOneList(payload));
    }
  }, [dispatch, userId]);

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
            <DeleteList id={list?.id} />
            <div className="ListTitle">{list?.name?.toUpperCase()}</div>
            <div className="Top-OneList-Container">
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
