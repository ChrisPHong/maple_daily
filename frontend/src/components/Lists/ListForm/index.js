import { useState, useEffect } from "react";
import { createListForm, getUserLists } from "../../../store/list.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBosses } from "../../../store/boss.js";
import Categories from "../categories/index.js";
import "./ListForm.css";

const ListForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [character, setCharacter] = useState("");
  const [payload, setPayLoad] = useState({});
  const [weeklyMarked, setWeeklyMarked] = useState(false);
  const [dailyMarked, setDailyMarked] = useState(false);
  const [showWQ, setShowWQ] = useState(false);
  const [showWB, setShowWB] = useState(false);
  const [showDQ, setShowDQ] = useState(false);
  const [showDB, setShowDB] = useState(false);
  const [showRD, setShowRD] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const keys = Object.keys(payload);

  const userId = useSelector((state) => state.session.user?.id);

  const weeklybosses = useSelector(
    (state) => state?.bossReducer?.boss?.Weekly?.Boss
  );
  const dailybosses = useSelector(
    (state) => state?.bossReducer?.boss?.Daily?.Boss
  );
  const dailyQuests = useSelector(
    (state) => state?.bossReducer?.boss?.Daily?.Quest
  );

  const weeklyQuests = useSelector(
    (state) => state?.bossReducer?.boss?.Weekly?.Quest
  );

  const changeView = (showing) => {

    const arr = [showWQ, showWB, showDQ, showDB, showRD];
    for (let ele of arr) {
      if (ele !== showing) {
      }
    }
  };

  const redemptionArr = [
    { bossNames: "Daily Gift", resetTime: "Daily", category: "Quest" },
    { bossNames: "Event Gift", resetTime: "Daily", category: "Quest" },
    {
      bossNames: "Special Event GiveAway",
      resetTime: "Daily",
      category: "Quest",
    },
  ];

  const buttonDisplay = (obj) => {
    if (!payload[obj.bossNames]) {
      setPayLoad({ ...payload, [obj.bossNames]: obj });
      return;
    } else {
      const newPayload = { ...payload };
      delete newPayload[obj.bossNames];
      setPayLoad(newPayload);
    }
    return;
  };

  const handleBtnClick = (button) => {
    if (payload[button.bossNames]) {
      const newPayload = { ...payload };
      delete newPayload[button.bossNames];
      setPayLoad(newPayload);
    } else {
      setPayLoad({ ...payload, [button.bossNames]: button });
    }
  };

  const addAllWeeklyBosses = () => {
    if (weeklyMarked) {
      const newPayload = { ...payload };
      for (let boss of weeklybosses) {
        delete newPayload[boss.bossNames];
      }
      setPayLoad(newPayload);
      setWeeklyMarked(false);
    } else {
      const newPayload = {};
      for (let boss of weeklybosses) {
        if (!payload[boss.bossNames]) {
          newPayload[boss.bossNames] = boss;
        }
      }
      setPayLoad({ ...payload, ...newPayload });
      setWeeklyMarked(true);
    }
  };

  const addAllDailyBosses = () => {
    if (dailyMarked) {
      const newPayload = { ...payload };
      for (let boss of dailybosses) {
        delete newPayload[boss.bossNames];
      }
      setPayLoad(newPayload);
      setDailyMarked(false);
    } else {
      const newPayload = {};
      for (let boss of dailybosses) {
        if (!payload[boss.bossNames]) {
          newPayload[boss.bossNames] = boss;
        }
      }
      setPayLoad({ ...payload, ...newPayload });
      setDailyMarked(true);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { name, character, userId, payload };
    await setDisableBtn(true);
    await dispatch(createListForm(data));
    await history.push("/");
    await setDisableBtn(false);
  };

  useEffect(() => {
    dispatch(getBosses());
  }, []);

  return (
    <div>
      <form>
        <div className="character-label-container">
          <div
            className="input-div"
            onMouseEnter={() => {
              setShowMessage(true);
            }}
            onMouseLeave={() => {
              setShowMessage(false);
            }}
          >
            <label className="input-div">
              List Name
              <input
                className="input"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </label>
          </div>
          <div className="input-div">
            <label className="input-div">
              Character
              <input
                className="input"
                onChange={(e) => {
                  setCharacter(e.target.value);
                }}
              ></input>
            </label>
          </div>
        </div>

        {/* Start of the div */}
        <div className="three-part-container">
          <div className="left-container">
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowWB(!showWB);
              }}
            >
              {showWB ? "Hide Weekly Bosses" : "Show Weekly Bosses"}
            </button>
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowDB(!showDB);
              }}
            >
              {showDB ? "Hide Daily Bosses" : "Show Daily Bosses"}
            </button>
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowRD(!showRD);
              }}
            >
              {showRD ? "Hide Redemption Tasks" : "Show Redemption Tasks"}
            </button>
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowDQ(!showDQ);
              }}
            >
              {showDQ ? "Hide Daily Quests" : "Show Daily Quests"}
            </button>
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowWQ(!showWQ);
              }}
            >
              {showWQ ? "Hide Weekly Quests" : "Show Weekly Quests"}
            </button>
          </div>

          <div className="all-boss-quests-container">
            {showWB ? (
              <div>
                <button
                  className="check-btn"
                  style={{
                    backgroundColor: showWB ? "#3bcc64" : "white",
                    color: showWB ? "white" : "black",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    addAllWeeklyBosses();
                  }}
                >
                  {weeklyMarked
                    ? "UnCheck All Weekly Bosses"
                    : "Check All Weekly Bosses"}
                </button>
                <div className="tasks-container">
                  {weeklybosses &&
                    weeklybosses.map((boss) => {
                      return (
                        <div
                          className="boss-btn"
                          style={{
                            backgroundColor: payload[boss.bossNames]
                              ? "#3bcc64"
                              : "transparent",
                            color: payload[boss.bossNames] ? "white" : "black",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleBtnClick(boss);
                          }}
                        >
                          {boss.bossNames}
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : null}

            <div>
              {showDB ? (
                <div>
                  <button
                    className="check-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      addAllDailyBosses();
                    }}
                  >
                    {dailyMarked
                      ? "UnCheck All Daily Bosses"
                      : "Check All Daily Bosses"}
                  </button>
                  <div className="tasks-container">
                    {dailybosses &&
                      dailybosses.map((boss) => {
                        return (
                          <>
                            <button
                              className="boss-btn"
                              style={{
                                backgroundColor: payload[boss.bossNames]
                                  ? "#3bcc64"
                                  : "transparent",
                                color: payload[boss.bossNames]
                                  ? "white"
                                  : "black",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleBtnClick(boss);
                              }}
                            >
                              {boss.bossNames}
                            </button>
                          </>
                        );
                      })}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="Redemption-Container">
              {showRD ? (
                <div className="tasks-container">
                  {redemptionArr.map((task, idx) => {
                    return (
                      <div key={task.id}>
                        <button
                          className="boss-btn"
                          style={{
                            backgroundColor: payload[task.bossNames]
                              ? "#3bcc64"
                              : "transparent",
                            color: payload[task.bossNames] ? "white" : "black",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            buttonDisplay(task);
                          }}
                        >
                          {task.bossNames}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <div className="daily-Container">
              {showDQ ? (
                <div className="tasks-container">
                  {dailyQuests &&
                    dailyQuests.map((task) => {
                      return (
                        <>
                          <button
                            className="boss-btn"
                            style={{
                              backgroundColor: payload[task.bossNames]
                                ? "#3bcc64"
                                : "transparent",
                              color: payload[task.bossNames]
                                ? "white"
                                : "black",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              buttonDisplay(task);
                            }}
                          >
                            {task.bossNames}
                          </button>
                        </>
                      );
                    })}
                </div>
              ) : null}
            </div>
            <div className="weekly-Container">
              {showWQ ? (
                <div className="tasks-container">
                  {weeklyQuests &&
                    weeklyQuests.map((quest) => {
                      return (
                        <>
                          <button
                            className="boss-btn"
                            style={{
                              backgroundColor: payload[quest.bossNames]
                                ? "#3bcc64"
                                : "transparent",
                              color: payload[quest.bossNames]
                                ? "white"
                                : "black",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              buttonDisplay(quest);
                            }}
                          >
                            {quest.bossNames}
                          </button>
                        </>
                      );
                    })}
                </div>
              ) : null}
            </div>
            <button
              disabled={disableBtn}
              className="submit-btn"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
          <div className="right-container">
            <div className="title-ul-div">
              <span className="container-title-right">You've Clicked On:</span>
              <ul className="ul-container">
                {keys &&
                  keys.map((key) => {
                    return <li className="li-listForm">{key}</li>;
                  })}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListForm;
