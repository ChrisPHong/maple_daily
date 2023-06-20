// Lists
const CREATE_LIST = "list/CREATE";
const GET_LISTS = "lists/GET";
const DELETE_LIST = "lists/Delete";
const CLEAR_LISTS = "lists/CLEAR";
const ERROR_LIST = "lists/ERROR";
const UPDATE_LIST = "lists/UPDATE";
const GET_EDIT_LIST = "lists/GET_EDIT_LIST";

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

export const updateListInfo = (list) => {
  return {
    type: UPDATE_LIST,
    list,
  };
};

export const getEditList = (list) => {
  return {
    type: GET_EDIT_LIST,
    list,
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

export const updateList = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${data.id}/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(updateListInfo(list));
    return list;
  }
};
export const clearingSession = (data) => async (dispatch) => {
  dispatch(clearSession());
  return {};
};

export const getEditLists = (data) => async (dispatch) => {
  console.log(parseInt(data.id), "<<<<< what is the data");
  const res = await csrfFetch(
    `/api/lists/${parseInt(data.id)}/${data.userId}/update`,
    {
      method: "GET",
    }
  );
  console.log(res, "<<<<<<<<<<<<<<<<<<<< RES");
  if (res.ok) {
    const list = await res.json();
    dispatch(getEditList(list));
    return list;
  }
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

const initialState = {
  lists: {},
  list: {},
  editingList: {},
  errors: {},
  isLoading: true,
};

const listReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_LIST:
      newState = {
        ...state,
        lists: { ...state.lists, [action.list.id]: action.list },
      };
      return newState;
    case UPDATE_LIST:
      newState = {
        ...state,
      };
      newState.list = [action.list];
      newState.lists[action.list.id] = action.list;
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
      if (newState.list[0].id === action.list.id) {
        delete newState.list[0];
      }
      return newState;

    case ERROR_LIST:
      newState = { ...state };
      return newState;

    case DELETE_TASK:
      newState = { ...state };
      let resetTime = action.task.resetTime;
      let category = action.task.category;
      let completed = action.task.completed ? "complete" : "incomplete";

      delete newState.lists[action.task.listId].Tasks[resetTime][category][
        completed
      ][action.task.id];
      if (newState.list[0].id === action.task.listId) {
        delete newState.list[0].Tasks[resetTime][category][completed][
          action.task.id
        ];
      }

      return newState;
    case GET_EDIT_LIST:
      newState = { ...state };
      newState.editingList = action.list;
      return newState;
    case CREATE_TASK:
      newState = { ...state };

      let time = action.task.resetTime;
      let ctgy = action.task.category;
      let cmplt = action.task.completed ? "complete" : "incomplete";

      newState.lists[action.task.listId].Tasks[time][ctgy][cmplt][
        action.task.id
      ] = action.task;
      if (newState.list[0].id === action.task.listId) {
        newState.list[0].Tasks[time][ctgy][cmplt][action.task.id] = action.task;
      }
      return newState;

    case EDIT_TASK:
      newState = { ...state };
      const x = action.task.resetTime;
      const y = action.task.category;
      const z = action.task.completed ? "complete" : "incomplete";
      const opposite = !action.task.completed ? "complete" : "incomplete";

      const taskExists =
        newState.lists[action.task.listId].Tasks[x][y][opposite][
          action.task.id
        ];

      newState.lists[action.task.listId].Tasks[x][y][z][action.task.id] =
        action.task;

      if (newState.list[0].id === action.task.listId) {
        newState.list[0].Tasks[x][y][z][action.task.id] = action.task;
      }

      if (taskExists) {
        delete newState.lists[action.task.listId].Tasks[x][y][opposite][
          action.task.id
        ];
        delete newState.list[0].Tasks[x][y][opposite][action.task.id];
      }

      return newState;
    case RESET_DAILY_TASKS:
      newState = { ...state };
      const taskArr = action.tasks;

      for (let i = 0; i < taskArr.length; i++) {
        let task = taskArr[i];
        let completeReset = task.completed ? "complete" : "incomplete";

        newState.lists[task.listId].Tasks[task.resetTime][task.category][
          completeReset
        ][task.id] = task;
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
