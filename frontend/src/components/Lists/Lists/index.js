import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./UsersLists.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserLists } from "../../../store/list";
import { getBosses } from "../../../store/boss";
import OneList from "../OneList";

const Lists = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const lists = useSelector((state) =>
    Object.values(state?.listReducer?.lists)
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userId) {
      dispatch(getUserLists({ userId }));
    }
  }, [dispatch, userId]);

const UsersLists = () => {
  const listNames = useSelector((state) =>
    Object.values(state.listReducer.lists)
  );
  const history = useHistory();
  return (

    <div className="sideListNames-container">
      {listNames.map((list) => {
        return (
          <div
            onClick={() => {
              history.push(`/lists/${list.id}`);
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
