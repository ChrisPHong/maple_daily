const CREATE_LIST = "list/CREATE";
const GET_LISTS = "lists/GET";
const DELETE_LIST = 'lists/Delete';
const GET_TASKS = "tasks/GET";

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


// Tasks
export const getTasks = (tasks) =>{
  return{
    type: GET_TASKS,
    tasks
  }
}

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

export const fetchTasks = (data) => async (dispatch) => {

  const res = await csrfFetch(`/api/tasks/${data.listId}`);
  if (res.ok) {
    const tasks = await res.json();
    dispatch(getTasks(tasks));
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
    case GET_TASKS:
      newState = {...state}
      const tasks = action.tasks.tasks;
      if(tasks.length > 0){
        newState.lists[tasks[0].listId].Tasks = tasks
      }

      // console.log(action.tasks.tasks, "<<<<<<<<<<<<<< action")

      return newState;
    default:
      return state;
  }
};

export default listReducer;
