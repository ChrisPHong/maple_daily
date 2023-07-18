import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UsersLists.css";
import { getOneList, getUserLists } from "../../../store/list";

const UsersLists = () => {
  const listNames = useSelector((state) =>
    Object.values(state.listReducer.lists)
  );

  const userId = useSelector((state) => state?.session?.user?.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserLists({ userId }));
    }
  }, [dispatch, userId]);
  const history = useHistory();
  return (
    <div className="sideListNames-container">
      {listNames.map((list, idx) => {
        return (
          <div
            key={idx}
            onClick={async () => {
              const payload = { listId: list.id, userId };
              await history.push(`/lists/${list.id}`);
              await dispatch(getOneList(payload));
            }}
            className="listName-button-container"
          >
            <div
              className="characterImageList-Container transform -scale-x-100"
              style={{
                backgroundImage: `url(${list.apiContent})`,
              }}
            ></div>
            <div className="list-Button-div mr-3">
              <h2 className="font-bold font-sans">
                {list.character.toUpperCase()}
              </h2>
              <span className="text-xxs mt-2 font-bold">
                {list.characterClass}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UsersLists;
