import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserLists } from "../../../store/list";
import OneList from "../OneList";
import { imagePosition, flippedImage } from "./helper";
// import background from "./maplestory.png";
import background from "./Character-Select.jpg";
import "./Lists.css";
import DeleteCharacterModal from "../../Modals/DeleteCharacterModal/DeleteCharacterModal";

const DashBoardLists = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const lists = useSelector((state) => state?.listReducer?.changeList);
  const listCheck = useSelector((state) => state?.listReducer?.changeList);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userId) {
      dispatch(getUserLists({ userId }));
    }
  }, [dispatch, userId]);

  const [mainList, setMainList] = useState([]);
  const [index, setIndex] = useState(0);
  const [listId, setListId] = useState(0);

  useEffect(() => {
    if (listCheck) {
      whichList(lists, index);
    }
  }, [listCheck, index, lists]);

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

    setMainList(result[idx]);
  };

  const indexChanger = (symbol) => {
    if (symbol === "+") {
      if (!mainList) return;
      if (lists.length === 12) return;
      if (mainList.length < 12) return;
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

  return (
    <div className="Dashboard-page">
      <div className="All-lists-Container">
        {lists.length === 0 ? (
          <div
            className="flex items-center justify-center h-screen absolute left-1/2 right-1/2
            "
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                history.push("/loadCharacter");
              }}
              className="character-list-btn"
            >
              <span className="plus-sign">+</span>
              <div className="CC-btn-div">
                <span className="">Add</span>
                <span className="">Character</span>
              </div>
            </button>
          </div>
        ) : (
          ""
        )}
        <div
          className="character-select-div"
          style={{
            background: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "1100px",
            height: "100vh",
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
      {lists.length === 0 ? (
        ""
      ) : (
        <div className="character-button-div">
          <div className="text-white font-bold mb-2 flex justify-evenly shadow">
            {index + 1} / {Math.ceil(lists.length / 12)}
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              onClick={(e) => {
                e.preventDefault();

                indexChanger("-");
              }}
              className="displayButton mr-5 text-white"
            >
              {`<`}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                history.push("/loadCharacter");
              }}
              className="character-list-btn mr-5"
            >
              <span className="plus-sign">+</span>
              <div className="CC-btn-div">
                <span className="">Add</span>
                <span className="">Character</span>
              </div>
            </button>
            <DeleteCharacterModal lists={lists} />
            <button
              onClick={(e) => {
                e.preventDefault();
                indexChanger("+");
              }}
              className="displayButton right-btn ml-5 text-white"
            >
              {`>`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardLists;
