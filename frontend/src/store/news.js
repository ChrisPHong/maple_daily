const GET_NEWS = "news/GET_NEWS";

const { csrfFetch } = require("../store/csrf");

export const getNews = (news) => {
  return {
    type: GET_NEWS,
    news,
  };
};

export const fetchNews = () => async (dispatch) => {
  const res = await csrfFetch(`/api/news/`, { method: "GET" });
  if (res.ok) {
    const news = await res.json();
    dispatch(getNews(news));
  }
};
const initialState = { entries: {}, news: {}, isLoading: true };

const newsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_NEWS:
      newState = { ...state };
      const { news } = action.news;

      return newState;
    default:
      return state;
  }
};

export default newsReducer;
