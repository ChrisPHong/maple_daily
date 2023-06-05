import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DeleteList from "../DeleteList";
import TaskForm from "../../Tasks/TaskForm";
import TasksList from "../../Tasks/Tasks";
import { useEffect } from "react";

import "./OneList.css";

const OneList = ({ props }) => {
  useEffect(() => {}, [props]);

  return (
    <div>
      <div className="OneList-container">
        <div className="ListTitle">{props.name.toUpperCase()}</div>
        <div className="Top-OneList-Container">
          <div className="characterInfo-container">
            <span className="character-info-data">
              Character Name: {props.character}
            </span>
            <span className="character-info-data">
              Class: {props.characterClass}
            </span>
            <span className="character-info-data">level: {props.level}</span>
            <span className="character-info-data">Server: {props.server}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneList;
