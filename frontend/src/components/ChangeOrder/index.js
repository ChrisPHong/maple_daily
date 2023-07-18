import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  sortList,
  sortUpdatingList,
  storingChangeList,
} from "../../store/list";

import "./ChangeOrder.css";

const ChangeOrder = ({ lists, closeModal }) => {
  const userId = useSelector((state) => state?.session?.user?.id);
  useEffect(() => {
    if (lists) {
      setNames(lists);
    }
  }, [lists]);
  const dispatch = useDispatch();
  const [names, setNames] = useState(lists);

  //save reference for dragItem and dragOverItem
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  // handle drag sorting
  const handleSort = () => {
    //duplicate items
    let copiedList = [...lists];
    //remove and save the dragged item content
    const draggedItemContent = copiedList.splice(dragItem.current, 1)[0];
    //switch the position
    copiedList.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the positon ref
    dragItem.current = null;
    dragOverItem.current = null;
    //update the actual array

    setNames(copiedList);
    dispatch(sortList(copiedList));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId,
      lists: names,
    };
    await dispatch(sortUpdatingList(payload));
  };
  return (
    <form className="changeOrderForm">
      <button
        className="cancel-drag-btn"
        onClick={async (e) => {
          e.preventDefault();
          await dispatch(storingChangeList({ lists: lists, type: "close" }));
          await closeModal(false);
        }}
      >
        X
      </button>
      <div className="change-order-container" droppable="true">
        {names?.map((list, idx) => {
          return (
            <div
              key={list.character}
              className="draggable character-drag-container"
              draggable
              onDragStart={(e) => {
                dragItem.current = idx;
              }}
              onDragEnter={(e) => {
                dragOverItem.current = idx;
              }}
              onDragEnd={handleSort}
              onDragOver={(e) => {
                e.preventDefault();
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
      <div className="changeOrder-btn-div">
        <button
          onClick={async (e) => {
            await onSubmit(e);
            await closeModal(false);
          }}
          className="submit-drag-btn"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default ChangeOrder;
