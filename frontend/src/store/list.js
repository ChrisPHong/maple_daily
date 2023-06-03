// Lists
const CREATE_LIST = "list/CREATE";
const GET_LISTS = "lists/GET";
const DELETE_LIST = "lists/Delete";
const CLEAR_LISTS = "lists/CLEAR";
const ERROR_LIST = "lists/ERROR";

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

export const clearSession = (data) => {
  return {
    type: CLEAR_LISTS,
    data,
  };
};

export const errorList = (error) => {
  return {
    type: ERROR_LIST,
    error,
  };
};

export const createListForm = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(createList(list));
    return list;
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

export const clearingSession = (data) => async (dispatch) => {
  dispatch(clearSession());
  return {};
};
// Tasks
const CREATE_TASK = "task/create";
const DELETE_TASK = "task/delete";
const EDIT_TASK = "task/edit";
const RESET_DAILY_TASKS = "task/daily/reset";

const removeTask = (task) => {
  return {
    type: DELETE_TASK,
    task,
  };
};

const makeTask = (task) => {
  return {
    type: CREATE_TASK,
    task,
  };
};
const putTask = (task) => {
  return {
    type: EDIT_TASK,
    task,
  };
};
const resetEveryDayTasks = (tasks) => {
  return {
    type: RESET_DAILY_TASKS,
    tasks,
  };
};

export const createTask = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return "Please provide the correct inputs";
  }
  if (response.ok) {
    const task = await response.json();
    dispatch(makeTask(task));
  }
};
export const editTask = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return "Please provide the correct inputs";
  }
  if (response.ok) {
    const task = await response.json();
    dispatch(putTask(task));
  }
};

export const deleteTask = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/tasks/${data.taskId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const task = await res.json();
    dispatch(removeTask(task));
    return task;
  }
};
// Reset Tasks
export const resetDailyTasks = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${data.userId}/daily`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return "Please provide the correct inputs";
  }
  if (response.ok) {
    const tasks = await response.json();
    dispatch(resetEveryDayTasks(tasks));
  }
};

// One List

const GET_LIST = "list/GET";

const getList = (list) => {
  return {
    type: GET_LIST,
    list,
  };
};

export const getOneList = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/lists/${data.listId}/${data.userId}`, {
    method: "GET",
  });

  if (res.ok) {
    const list = await res.json();
    dispatch(getList(list));
    return list;
  }
};

const initialState = { lists: {}, list: {}, errors: {}, isLoading: true };

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
      const { lists } = action;

      lists.map((list) => {
        return (newState.lists[list.id] = list);
      });

      return newState;

    case DELETE_LIST:
      newState = { ...state };
      delete newState.lists[action.list.id];
      return newState;

    case ERROR_LIST:
      newState = { ...state };
      return newState;

    case DELETE_TASK:
      newState = { ...state };
      let resetTime = action.task.resetTime;
      let category = action.task.category;
      delete newState.lists[action.task.listId].Tasks[resetTime][category][
        action.task.id
      ];
      if (newState.list[0].id === action.task.listId) {
        delete newState.list[0].Tasks[resetTime][category][action.task.id];
      }

      return newState;
    case CREATE_TASK:
      newState = { ...state };

      let time = action.task.resetTime;
      let ctgy = action.task.category;
      if (Array.isArray(newState.lists[action.task.listId].Tasks)) {
        newState.lists[action.task.listId].Tasks = {
          Daily: { Boss: {}, Quest: {} },
          Weekly: { Boss: {}, Quest: {} },
        };
        newState.list[0][action.task.listId].Tasks = {
          Daily: { Boss: {}, Quest: {} },
          Weekly: { Boss: {}, Quest: {} },
        };
      }

      newState.lists[action.task.listId].Tasks[time][ctgy][action.task.id] =
        action.task;
      if (newState.list[0].id === action.task.listId) {
        newState.list[0].Tasks[time][ctgy][action.task.id] = action.task;
      }
      return newState;
    case EDIT_TASK:
      newState = { ...state };
      const x = action.task.resetTime;
      const y = action.task.category;
      newState.lists[action.task.listId].Tasks[x][y][action.task.id] =
        action.task;

      if (newState.list[0].id === action.task.listId) {
        newState.list[0].Tasks[x][y][action.task.id] = action.task;
      }

      return newState;
    case RESET_DAILY_TASKS:
      newState = { ...state };
      const taskArr = action.tasks;

      for (let i = 0; i < taskArr.length; i++) {
        let task = taskArr[i];

        newState.lists[task.listId].Tasks[task.resetTime][task.category][
          task.id
        ] = task;
      }

      return newState;
    case GET_LIST:
      newState = { ...state, list: {} };
      const list = action.list;
      newState.list = list;

      return newState;

    case CLEAR_LISTS:
      return { lists: {}, list: {}, isLoading: false };
    default:
      return state;
  }
};

export default listReducer;
