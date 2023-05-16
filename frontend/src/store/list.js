const CREATE_LIST = "list/CREATE";
const GET_LISTS = "lists/GET";
const DELETE_LIST = 'lists/Delete';

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

export const removeList = (list) => {
  return {
    type: DELETE_LIST,
    list,
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

export const getUserLists = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/lists/${data.userId}`, {
    method: "GET",
  });

  if (res.ok) {
    const lists = await res.json();
    dispatch(getLists(lists));
    return lists;
  }
};

export const deletingList = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/lists/${data.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const list = await res.json();
    dispatch(removeList(list));
    return list;
  }
};
const initialState = { entries: {}, lists: {}, isLoading: true };

const listReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_LIST:
      console.log(action, "<<<< action >>>>")
      newState = {
        ...state,
        lists: { ...state.lists, [action.list.id]: action.list },
      };
      return newState;
    case GET_LISTS:
      newState = {
        ...state,
        lists: {},
      };
      const { lists } = action.lists;
      lists.map((list) => {
        return (newState.lists[list.id] = list);
      });
      return newState;

    case DELETE_LIST:
      newState = {...state}
      delete newState.lists[action.list.id]
      return newState;
    default:
      return state;
  }
};

export default listReducer;