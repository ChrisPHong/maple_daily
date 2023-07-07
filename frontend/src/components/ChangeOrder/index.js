import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  sortList,
  sortUpdatingList,
  storingChangeList,
} from "../../store/list";

import "./ChangeOrder.css";

const ChangeOrder = ({ lists, setShowChangeOrder, showChangeOrder }) => {
  // let lists = useSelector((state) =>
  //   Object.values(state?.listReducer?.changeList)
  // );

  const userId = useSelector((state) => state?.session?.user?.id);

  useEffect(() => {
    if (lists) {
      setNames(lists);
    }
  }, [lists]);
  const dispatch = useDispatch();
  const history = useHistory();
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
    // console.log(dragItem, "<<<<, dragItem");
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
    await dispatch(storingChangeList({ lists, type: "open" }));
    await setShowChangeOrder(!showChangeOrder);
  };
  return (
    <form className="changeOrderForm">
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
                // className="characterImageList-Container"
                className="characterImage-drag"
              ></div>
            </div>
          );
        })}
      </div>
      <div className="changeOrder-btn-div">
        <button
          className="cancel-drag-btn"
          onClick={(e) => {
            e.preventDefault();
            setShowChangeOrder(!showChangeOrder);
            dispatch(storingChangeList({ lists: lists, type: "close" }));
          }}
        >
          Cancel
        </button>
        <button
          onClick={(e) => {
            onSubmit(e);
          }}
          className="submit-drag-btn"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ChangeOrder;
