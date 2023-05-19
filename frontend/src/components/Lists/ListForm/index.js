import { useState, useEffect } from "react";
import { createListForm, getUserLists } from "../../../store/list.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBosses } from "../../../store/boss.js";
import Categories from "../categories/index.js";

const ListForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [character, setCharacter] = useState("");
  const [payload, setPayLoad] = useState({});
  const [weeklyMarked, setWeeklyMarked] = useState(false);
  const [dailyMarked, setDailyMarked] = useState(false);
  const userId = useSelector((state) => state.session.user?.id);

  const weeklybosses = useSelector((state) => state.bossReducer.boss.weekly);
  const dailybosses = useSelector((state) => state?.bossReducer?.boss?.daily);
  const guildArr = ["Flag", "Culver"];
  const redemptionArr = ["Daily Gift", "Event Gift", "Special Event GiveAway"];
  const miscArr = ["Monster Park", "Maple Tour"];
  const dailyQuest = ["Arcana", "Morass", "Lachlain"];
  const weekQuest = ["Haven", "Dark World Tree"];
console.log(payload, "<<<<<<<<<payload");
  const buttonDisplay = (name) => {
    if (!payload[name]) {
      setPayLoad({ ...payload, [name]: true });
      return;
    } else {
      const newPayload = { ...payload };
      delete newPayload[name];
      setPayLoad(newPayload);
    }
    return;
  };

  // const category = { weeklyBosses:["Extreme Black Mage", "Extreme Chosen Seren", "Hard Black Mage", "Chaos Kaos The Gaurdian", "Hard Chosen Seren", "Normal Chosen Seren", "Hard Versus Hilla", "Hard Darknell", "Chaos Gloom", "Chaos Guardian Angel Slim", "Normal Versus Hilla", "Hard Will", "Hard Lucid", "Hard Lotus", "Hard Damien", "Normal Darknell", "Normal Gloom", "Normal Will", "Normal Lucid", "Easy Will", "Easy Lucid", "Normal Guardian Angel Slime", "Normal Damien", "Normal Lotus", "Akechi Mitsuhide", "Chaos Papulatus", "Chaos Vellum", "Hard Magnus", "Princess No", "Chaos Pierre", "Chaos Von Bon", "Chaos Zakum", "Chaos Crimeson Queen", "Normal Cygnus", "Chaos Pink Bean", "Hard Hilla", "Easy Cygnus", "Mori Ranmaru", "Normal Papulatus", "Normal Magnus", "Normal Akarium", "Hard Von Leon", "Normal Von Leon", "Normal Pink Bean", "Chaos Horntail", "OMNI-CLN", "Frenzied Gigatoad", "Easy Arkarium", "Easy Von Lean", "Normal Horntail", "Normal Vellum", "Normal Crimson Queen", "Normal Von Bon", "normal Pierre", "Gigatoad", "Easy Horntail", "Mori Ranmaru", "Normal Hilla", "Yakuza Boss", "Easy Magnus", "Easy Papulatus", "Normal Zakum", "Easy Zakum"  ]};
  const handleBtnClick = (button) => {
    if (payload[button]) {
      const newPayload = { ...payload };
      delete newPayload[button];
      setPayLoad(newPayload);
    } else {
      setPayLoad({ ...payload, [button]: true });
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
          newPayload[boss.bossNames] = true;
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
          newPayload[boss.bossNames] = true;
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

    // await dispatch(getUserLists({userId}))
  };

  useEffect(async () => {
    await dispatch(getBosses());
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
            <div>Weekly Bosses</div>
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleBtnClick(boss.bossNames);
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleBtnClick(boss.bossNames);
                    }}
                  >
                    {boss.bossNames}
                  </button>
                </>
              );
            })}
        </label>
        <div className="Guild-Container">
          <div>Guild Tasks</div>
          {guildArr.map((task) => {
            return (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    buttonDisplay(task);
                  }}
                >
                  {task}
                </button>
              </>
            );
          })}
        </div>
        <div className="Redemption-Container">
          <div>Redemption Tasks</div>
          {redemptionArr.map((task) => {
            return (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    buttonDisplay(task);
                  }}
                >
                  {task}
                </button>
              </>
            );
          })}
        </div>
        <div className="misc-Container">
          <div>Miscellaneous Tasks</div>
          {miscArr.map((task) => {
            return (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    buttonDisplay(task);
                  }}
                >
                  {task}
                </button>
              </>
            );
          })}
        </div>
        <div className="daily-Container">
          <div>Daily Quests</div>
          {dailyQuest.map((task) => {
            return (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    buttonDisplay(task);
                  }}
                >
                  {task}
                </button>
              </>
            );
          })}
        </div>
        <div className="weekly-Container">
          <div>Weekly Quests</div>
          {weekQuest.map((task) => {
            return (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    buttonDisplay(task);
                  }}
                >
                  {task}
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
