import { useState, useEffect } from "react";
import { createListForm, getUserLists } from "../../../store/list.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBosses } from "../../../store/boss.js";
import Categories from "../categories/index.js";
import './ListForm.css'

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

  const redemptionArr = [
    { bossNames: "Daily Gift", resetTime: "Daily", category: "Quest" },
    { bossNames: "Event Gift", resetTime: "Daily", category: "Quest" },
    {
      bossNames: "Special Event GiveAway",
      resetTime: "Daily",
      category: "Quest",
    },
  ];

  console.log(payload, "<<<<< what is the payload");

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
    await dispatch(createListForm(data));
    await history.push("/");
  };

  useEffect(() => {
    dispatch(getBosses());
  }, []);

  return (
    <>
      <form>
        <label>
          List Name
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </label>
        <label>
          character
          <input
            onChange={(e) => {
              setCharacter(e.target.value);
            }}
          ></input>
          <div>
            <button onClick={()=>{
              setShowWB(!showWB)
            }}>Weekly Bosses</button>

            <button
              onClick={(e) => {
                e.preventDefault();
                addAllWeeklyBosses();
              }}
            >
              {weeklyMarked
                ? "UnCheck All Weekly Bosses"
                : "Check All Weekly Bosses"}
            </button>
          </div>
          {weeklybosses &&
            weeklybosses.map((boss) => {
              return (
                <>
                  <button
                  // className="boss-btn"
                  style={{backgroundColor: payload[boss.bossNames] ? 'green': 'transparent'}}
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
          <div>
            <div>Daily Bosses</div>
            <button
              onClick={(e) => {
                e.preventDefault();
                addAllDailyBosses();
              }}
            >
              {dailyMarked
                ? "UnCheck All Daily Bosses"
                : "Check All Daily Bosses"}
            </button>
          </div>
          {dailybosses &&
            dailybosses.map((boss) => {
              return (
                <>
                  <button
                  // className="boss-btn"
                  style={{backgroundColor: payload[boss.bossNames] ? 'green': 'transparent'}}
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
        </label>

        <div className="Redemption-Container">
          <div>Redemption Tasks</div>
          {redemptionArr.map((task, idx) => {
            return (
              <div key={task.id}>
                <button
                className="boss-btn"
                style={{backgroundColor: payload[task.bossNames] ? 'green': 'transparent'}}
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
        <div className="daily-Container">
          <div>Daily Quests</div>
          {dailyQuests &&
            dailyQuests.map((task) => {
              return (
                <>
                  <button
                  className="boss-btn"
                  style={{backgroundColor: payload[task.bossNames] ? 'green': 'transparent'}}
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
        <div className="weekly-Container">
          <div>Weekly Quests</div>
          {weeklyQuests &&
            weeklyQuests.map((quest) => {
              return (
                <>
                  <button
                    className="boss-btn"
                  style={{backgroundColor: payload[quest.bossNames] ? 'green': 'transparent'}}
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
        <button onClick={onSubmit}>Submit</button>
      </form>
    </>
  );
};

export default ListForm;
