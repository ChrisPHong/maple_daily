import { useState, useEffect } from "react";
import { checkingCharacter, createListForm } from "../../../store/list.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBosses } from "../../../store/boss.js";
import "./ListForm.css";
import Loading from "../../Loading/index.js";

const ListForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [character, setCharacter] = useState("");
  const [payload, setPayLoad] = useState({});
  const [weeklyMarked, setWeeklyMarked] = useState(false);
  const [dailyMarked, setDailyMarked] = useState(false);
  const [redemptionTask, setRedemptionTask] = useState(false);
  const [showDailyQuests, setShowDailyQuests] = useState(false);
  const [showWeeklyQuests, setShowWeeklyQuests] = useState(false);
  const [showWQ, setShowWQ] = useState(false);
  const [showWB, setShowWB] = useState(false);
  const [showDQ, setShowDQ] = useState(false);
  const [showDB, setShowDB] = useState(false);
  const [showRD, setShowRD] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const [error, setError] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const userId = useSelector((state) => state.session.user?.id);
  const loadingCharacter = useSelector(
    (state) => state.listReducer?.characterCheck
  );
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

  const addRedemptionTasks = () => {
    if (redemptionTask) {
      const newPayload = { ...payload };
      for (let task of redemptionArr) {
        delete newPayload[task.bossNames];
      }
      setPayLoad(newPayload);
      setRedemptionTask(false);
    } else {
      const newPayload = {};
      for (let task of redemptionArr) {
        if (!payload[task.bossNames]) {
          newPayload[task.bossNames] = task;
        }
      }
      setPayLoad({ ...payload, ...newPayload });
      setRedemptionTask(true);
    }
  };

  const addDailyQuests = () => {
    if (showDailyQuests) {
      const newPayload = { ...payload };
      for (let task of dailyQuests) {
        delete newPayload[task.bossNames];
      }
      setPayLoad(newPayload);
      setShowDailyQuests(false);
    } else {
      const newPayload = {};
      for (let task of dailyQuests) {
        if (!payload[task.bossNames]) {
          newPayload[task.bossNames] = task;
        }
      }
      setPayLoad({ ...payload, ...newPayload });
      setShowDailyQuests(true);
    }
  };

  const addWeeklyQuests = () => {
    if (showWeeklyQuests) {
      const newPayload = { ...payload };
      for (let task of weeklyQuests) {
        delete newPayload[task.bossNames];
      }
      setPayLoad(newPayload);
      setShowWeeklyQuests(false);
    } else {
      const newPayload = {};
      for (let task of weeklyQuests) {
        if (!payload[task.bossNames]) {
          newPayload[task.bossNames] = task;
        }
      }
      setPayLoad({ ...payload, ...newPayload });
      setShowWeeklyQuests(true);
    }
  };

  const handleButtonPress = () => {
    setBtnPressed(true);
  };

  const handleButtonRelease = () => {
    setBtnPressed(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const apiContent = loadingCharacter.CharacterImageURL;
    const characterClass = loadingCharacter.Class;
    const server = loadingCharacter.Server;
    const level = loadingCharacter.Level;
    const character = loadingCharacter.Name;
    const testing = "hello";
    const data = {
      character,
      apiContent,
      characterClass,
      server,
      level,
      userId,
      payload,
      name: testing,
    };

    try {
      await setShowLoading(true);
      await setDisableBtn(true);
      await dispatch(createListForm(data));
      await history.push("/");
    } catch (error) {
      const { message } = await error.json();
      setError([message]);
    } finally {
      await setShowLoading(false);
      await setDisableBtn(false);
    }
  };

  const changeTab = (showing) => {
    const sectionVisibility = {
      showWB: false,
      showDB: false,
      showRD: false,
      showDQ: false,
      showWQ: false,
    };

    sectionVisibility[showing] = true;
    // Update the visibility state of all sections
    setShowWB(sectionVisibility.showWB);
    setShowDB(sectionVisibility.showDB);
    setShowRD(sectionVisibility.showRD);
    setShowDQ(sectionVisibility.showDQ);
    setShowWQ(sectionVisibility.showWQ);
  };
  useEffect(() => {
    dispatch(getBosses());
  }, []);

  useEffect(() => {
    if (loadingCharacter.CharacterImageURL === undefined) {
      const storedValue = localStorage.getItem("key");
      const data = JSON.parse(storedValue);
      if (!data) {
        history.push("/LoadCharacter");
        return;
      }
    }
  }, []);

  return (
    <div className="top-list-container">
      {showLoading ? <Loading /> : null}
      <form>
        <div className="character-label-container"></div>

        {/* Start of the div */}
        <div className="three-part-container mt-5">
          <div className="left-container">
            <div className="flex justify-center items-center">
              <div className="top-picture-Container">
                <div className="LoadingCharacter-backdrop">
                  <img
                    className="loadingCharacter-img"
                    alt="loading_character_img"
                    src={loadingCharacter?.CharacterImageURL}
                  />
                </div>
              </div>
            </div>
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();
                changeTab("showWB");
              }}
            >
              {showWB ? "Weekly Bosses" : "Show Weekly Bosses"}
            </button>
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();

                changeTab("showDB");
              }}
            >
              {showDB ? "Daily Bosses" : "Show Daily Bosses"}
            </button>
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();
                changeTab("showRD");
              }}
            >
              {showRD ? "Redemption Quests" : "Show Redemption Quests"}
            </button>
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();
                changeTab("showDQ");
              }}
            >
              {showDQ ? "Daily Quests" : "Show Daily Quests"}
            </button>
            <button
              className="tite-btn"
              onClick={(e) => {
                e.preventDefault();
                changeTab("showWQ");
              }}
            >
              {showWQ ? "Weekly Quests" : "Show Weekly Quests"}
            </button>
            <button
              disabled={disableBtn}
              className={`submit-btn ${btnPressed ? "pressed" : ""}`}
              onClick={onSubmit}
              onMouseDown={handleButtonPress}
              onMouseUp={handleButtonRelease}
            >
              Submit
            </button>
          </div>

          <div className="all-boss-quests-container ml-5">
            <h3 className="font-bold text-3xl underline">Instructions</h3>
            <div className="instruction-div font-bold py-4">
              Go through each tab to add quests/bosses to your character! Once
              you have all the tasks you want to add, then click submit!
            </div>

            {showWB ? (
              <div>
                <button
                  className="check-btn"
                  style={{
                    // backgroundColor: showWB ? "#0087d7" : "white",
                    background: showWB
                      ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
                      : "white",
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
                <div className="create-tasks-container">
                  {weeklybosses &&
                    weeklybosses.map((boss) => {
                      return (
                        <div
                          className="boss-btn"
                          style={{
                            background: payload[boss.bossNames]
                              ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
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
                    style={{
                      // backgroundColor: showWB ? "#0087d7" : "white",
                      background: showDB
                        ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
                        : "white",
                      color: showDB ? "white" : "black",
                    }}
                  >
                    {dailyMarked
                      ? "UnCheck All Daily Bosses"
                      : "Check All Daily Bosses"}
                  </button>
                  <div className="create-tasks-container">
                    {dailybosses &&
                      dailybosses.map((boss) => {
                        return (
                          <>
                            <button
                              className="boss-btn"
                              style={{
                                background: payload[boss.bossNames]
                                  ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
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
                <>
                  <button
                    className="check-btn"
                    style={{
                      // backgroundColor: showWB ? "#0087d7" : "white",
                      background: showRD
                        ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
                        : "white",
                      color: showRD ? "white" : "black",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      addRedemptionTasks();
                    }}
                  >
                    {redemptionTask
                      ? "UnCheck All Redemption Quests"
                      : "Check All Redemption Quests"}
                  </button>
                  <div className="create-three-tasks-container">
                    {redemptionArr.map((task, idx) => {
                      return (
                        <div key={task.id}>
                          <button
                            className="boss-btn"
                            style={{
                              background: payload[task.bossNames]
                                ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
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
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : null}
            </div>
            <div className="daily-Container">
              {showDQ ? (
                <>
                  <button
                    className="check-btn"
                    style={{
                      background: showDQ
                        ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
                        : "white",
                      color: showDQ ? "white" : "black",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      addDailyQuests();
                    }}
                  >
                    {showDailyQuests
                      ? "UnCheck All Daily Quests"
                      : "Check All Daily Quests"}
                  </button>
                  <div className="create-tasks-container">
                    {dailyQuests &&
                      dailyQuests.map((task) => {
                        return (
                          <>
                            <button
                              className="boss-btn"
                              style={{
                                background: payload[task.bossNames]
                                  ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
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
                </>
              ) : null}
            </div>
            <div className="weekly-Container">
              {showWQ ? (
                <>
                  <button
                    className="check-btn"
                    style={{
                      background: showWQ
                        ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
                        : "white",
                      color: showWQ ? "white" : "black",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      addWeeklyQuests();
                    }}
                  >
                    {showWeeklyQuests
                      ? "UnCheck All Weekly Quests"
                      : "Check All Weekly Quests"}
                  </button>
                  <div className="create-tasks-container">
                    {weeklyQuests &&
                      weeklyQuests.map((quest) => {
                        return (
                          <>
                            <button
                              className="boss-btn "
                              style={{
                                background: payload[quest.bossNames]
                                  ? "linear-gradient(to bottom, #67d9ee, #0087d7)"
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
                </>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ListForm;
