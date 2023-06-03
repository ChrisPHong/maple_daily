import { useSelector, useDispatch } from "react-redux";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getOneList } from "../../../store/list.js";
const List = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const list = useSelector((state) => state?.listReducer?.list);
  const params = useParams();
  const { listId } = params;

  const dispatch = useDispatch();

  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (userId) {
      const payload = { listId, userId };
      dispatch(getOneList(payload));
    }
  }, [dispatch, userId]);
  /*
Things to do:
- Figure out how to load in the data properly
- Check the back end to see if it's sending the correct data
-

*/
  // {/* <div>Completed Todays Dailies: {`${list.completed}`}</div> */}
  return (
    <div>
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
            <span className="character-info-data">level: {list?.level}</span>
            <span className="character-info-data">Server: {list?.server}</span>
          </div>
        </div>
        <div className="tasks-container">
          <TaskForm
            props={{ listId: list?.id, userId, name: list?.character }}
          />
          {list?.Tasks ? <TasksList props={list?.Tasks} /> : <></>}
          {list?.Tasks ? (
            <div>hello this is the task and it's truthy</div>
          ) : (
            <>it doesn't exist</>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
