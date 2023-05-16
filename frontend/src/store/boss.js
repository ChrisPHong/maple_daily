const GET_BOSSES = "bosses/GET";

const { csrfFetch } = require("../store/csrf");

export const fetchBoss = (bosses) => {
  return {
    type: GET_BOSSES,
    bosses,
  };
};

export const getBosses = () => async (dispatch) => {
  const res = await csrfFetch(`/api/bosses/`);
  if (res.ok) {
    const bosses = await res.json();
    dispatch(fetchBoss(bosses));
  }
};
const initialState = { boss: {}, isLoading: true };

const bossReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_BOSSES:
      newState = { ...state };
      let weeklyBoss = action.bosses.Weekly.Boss;
      let dailyBoss = action.bosses.Daily.Boss;
      let weeklyQuest = action.bosses.Weekly.Quest;
      let dailyQuest = action.bosses.Daily.Quest;

      newState.boss.Weekly = { Boss: {}, Quest: {} };
      newState.boss.Daily = { Boss: {}, Quest: {} };

      newState.boss.Weekly.Boss = Object.values(weeklyBoss);
      newState.boss.Daily.Boss = Object.values(dailyBoss);
      newState.boss.Weekly.Quest = Object.values(weeklyQuest);
      newState.boss.Daily.Quest = Object.values(dailyQuest);
      return newState;
    default:
      return state;
  }
};

export default bossReducer;
