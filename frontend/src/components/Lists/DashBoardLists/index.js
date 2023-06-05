import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserLists } from "../../../store/list";
import OneList from "../OneList";
import { imagePosition, flippedImage } from "./helper";
import background from "./maplestory.png";
import "./Lists.css";

const DashBoardLists = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const lists = useSelector((state) =>
    Object.values(state?.listReducer?.lists)
  );
  const listCheck = useSelector((state) => state?.listReducer?.lists);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userId) {
      dispatch(getUserLists({ userId }));
    }
  }, [dispatch, userId]);

  const [fullList, setFullList] = useState([]);
  const [mainList, setMainList] = useState([]);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (listCheck) {
      whichList(lists, index);
    }
  }, [listCheck, index]);

  const whichList = (arr, idx) => {
    let result = [];
    let i = 0;
    let j = 12;
    while (i < arr.length) {
      let newArr = arr.slice(i, j);
      result.push(newArr);
      i = j;
      j += 12;
    }

    setFullList(result);
    setMainList(result[idx]);
  };

  const indexChanger = (symbol) => {
    if (symbol === "+") {
      const num = index + 1;
      setIndex(num);
      return;
    } else {
      if (index <= 0) return;
      const num = index - 1;
      setIndex(num);
      return;
    }
  };
  const showCharacterInfo = () => {
    setShow(!show);
  };
  return (
    <div className="Dashboard-page">
      <div className="All-lists-Container">
        <div
          className="character-select-div"
          style={{
            background: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "1100px",
            height: "80vh",
          }}
        >
          {mainList?.map((list, idx) => {
            return (
              <div
                className="character-div-dashboard"
                style={imagePosition(idx)}
                key={list.id}
              >
                <div className="character-name-container">
                  <img
                    onClick={() => {
                      history.push(`/lists/${list.id}`);
                    }}
                    alt="characterImage"
                    className={`${flippedImage(idx)} characterImage-Dashboard`}
                    src={list.apiContent}
                  />
                  <div className="character-Name-tag">{list.character}</div>
                  <div className="info">
                    <OneList props={list} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div></div>
      <div className="character-button-div">
        <button
          onClick={(e) => {
            e.preventDefault();

            indexChanger("-");
          }}
          className="displayButton"
        >
          {`<`}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            history.push("/createlist");
          }}
          className="character-list-btn"
        >
          <span className="plus-sign">+</span>
          <div className="CC-btn-div">
            <span className="">Create</span>
            <span className="">Character List</span>
          </div>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            indexChanger("+");
          }}
          className="displayButton"
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default DashBoardLists;
