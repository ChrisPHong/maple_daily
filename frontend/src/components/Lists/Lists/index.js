import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UsersLists.css";
import { getOneList } from "../../../store/list";

const UsersLists = () => {
  const listNames = useSelector((state) =>
    Object.values(state.listReducer.lists)
  );
  const userId = useSelector((state) => state?.session?.user?.id);

  // console.log(listNames, "<<<<< lisNames");

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);
  const history = useHistory();
  return (
    <div className="sideListNames-container">
      {listNames.map((list) => {
        console.log(list, "<<<<< list for userlists");
        return (
          <div
            onClick={async () => {
              const payload = { listId: list.id, userId };
              await history.push(`/lists/${list.id}`);
              await dispatch(getOneList(payload));
            }}
            className="listName-button-container"
          >
            <div className="list-Button-div">
              <h2 className="list-character-div">
                {list.character.toUpperCase()}
              </h2>
              <h6 className="list-characterclass-div">{list.characterClass}</h6>
            </div>
            <div
              className="characterImageList-Container"
              style={{
                backgroundImage: `url(${list.apiContent})`,
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default UsersLists;
