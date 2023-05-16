const CREATE_LIST = "list/CREATE";
const GET_LISTS = "lists/GET";

const { csrfFetch } = require("../store/csrf");

export const createList = (list) => {
  return {
    type: CREATE_LIST,
    list,
  };
};

export const getLists = (lists) => {
  return {
    type: GET_LISTS,
    lists,
  };
};

export const createListForm = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return "Please provide the correct inputs";
  }
  if (response.ok) {
    const list = await response.json();
    dispatch(createList(list));
  }
};

export const getUserLists = () => async (dispatch) => {
  const res = await csrfFetch(`/api/lists/`, {
    method: "GET",
  });
  console.log(res, "<<<<<<< data >>>>>>>>>>>>>>>>>");
  if (res.ok) {
    const lists = await res.json();
    dispatch(getLists(lists));
  }
};
const initialState = { entries: {}, list: {}, isLoading: true };

const listReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_LIST:
      newState = {
        ...state,
        entries: { ...state.entries, [action.list.id]: action.list },
      };
      return newState;
    case GET_LISTS:
      newState = {
        ...state,
      };
      console.log(action, "<<<<<<< what is this");

      return newState;
    default:
      return state;
  }
};

export default listReducer;
