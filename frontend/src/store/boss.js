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
      let weeklyBoss = action.bosses.weekly;
      let daily = action.bosses.daily;
      newState.boss.weekly = weeklyBoss;
      newState.boss.daily = daily;
      return newState;
    default:
      return state;
  }
};

export default bossReducer;
