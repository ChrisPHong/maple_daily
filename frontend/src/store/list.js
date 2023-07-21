// Lists
const CREATE_LIST = "list/CREATE";
const GET_LISTS = "lists/GET";
const DELETE_LIST = "lists/Delete";
const CLEAR_LISTS = "lists/CLEAR";
const ERROR_LIST = "lists/ERROR";
const UPDATE_LIST = "lists/UPDATE";
const GET_EDIT_LIST = "lists/GET_EDIT_LIST";
const EDIT_LIST = "lists/EDIT_LIST";
const SORT_LIST = "lists/SORTING_LIST";
const SORT_UPDATE_LIST = "lists/SORT_UPDATE_LIST";
const STORE_CHANGE_LIST = "lists/STORE_CHANGE_LIST";
const CHECK_CHARACTER = "lists/CHECK_CHARACTER";
const DELETE_DASHBOARD_LIST = "lists/DELETE_DASHBOARD_LIST";

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
export const editList = (list) => {
  return {
    type: EDIT_LIST,
    list,
  };
};

export const sortList = (lists) => {
  return {
    type: SORT_LIST,
    lists,
  };
};
export const sortUpdateList = (lists) => {
  return {
    type: SORT_UPDATE_LIST,
    lists,
  };
};
export const storingChangeList = (lists) => {
  return {
    type: STORE_CHANGE_LIST,
    lists,
  };
};
export const checkCharacter = (character) => {
  return {
    type: CHECK_CHARACTER,
    character,
  };
};

export const removeDashboardList = (list) => {
  return {
    type: DELETE_DASHBOARD_LIST,
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
export const sortUpdatingList = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/changeOrder/${data.userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const lists = await response.json();
    dispatch(sortUpdateList(lists));
    return lists;
  }
};

export const editingList = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/${data.listId}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(editList(list));
    return list;
  }
};

export const checkingCharacter = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/lists/checkingCharacter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const character = await response.json();
    dispatch(checkCharacter(character));
    return character;
  }
};

export const clearingSession = (data) => async (dispatch) => {
  dispatch(clearSession());
  return {};
};

export const getEditLists = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/lists/editingList/${data.listId}/maple`, {
    method: "GET",
  });

  if (res.ok) {
    const list = await res.json();
    dispatch(getEditList(list));
    return list;
  }
};

export const deletingDashboardList = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/lists/${data.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const list = await res.json();
    dispatch(removeDashboardList(list));
    return list;
  }
};

// Tasks
const CREATE_TASK = "task/create";
const DELETE_TASK = "task/delete";
const EDIT_TASK = "task/edit";
const RESET_DAILY_TASKS = "task/daily/reset";
const RESET_WEEKLY_BOSSES = "task/weekly/bosses/reset";
const RESET_WEEKLY_TASKS = "task/weekly/tasks/reset";

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
const resetWeeklyBoss = (tasks) => {
  return {
    type: RESET_WEEKLY_BOSSES,
    tasks,
  };
};
const resetWeeklyTASKS = (tasks) => {
  return {
    type: RESET_WEEKLY_TASKS,
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

  if (response.ok) {
    const tasks = await response.json();
    dispatch(resetEveryDayTasks(tasks));
  }
};
export const resetWeeklyBosses = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${data.userId}/weekly`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const tasks = await response.json();
    dispatch(resetWeeklyBoss(tasks));
  }
};
export const resetWeeklyQuests = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/tasks/${data.userId}/weekly`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const tasks = await response.json();
    dispatch(resetWeeklyTASKS(tasks));
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
  characterCheck: {},
  changeList: [],
  storeChangeList: [],
  isLoading: true,
};

const listReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_LIST:
      newState = {
        ...state,
        lists: { ...state.lists, [action.list.orderBy]: action.list },
      };
      return newState;
    case UPDATE_LIST:
      newState = {
        ...state,
      };
      newState.list = [action.list];
      newState.lists[action.list.orderBy] = action.list;
      return newState;

    case GET_LISTS:
      newState = {
        ...state,
        lists: {},
      };
      const { lists } = action;
      lists.map((list) => {
        return (newState.lists[list.orderBy] = list);
      });
      newState.changeList = lists;
      return newState;

    case DELETE_LIST:
      newState = { ...state };

      delete newState.lists[action.list.orderBy];

      newState.changeList.splice(action.list.orderBy, 1);
      if (newState.list) {
        delete newState.list[0];
      }
      return newState;
    case DELETE_DASHBOARD_LIST:
      newState = { ...state };
      const newChangeList = newState.changeList.filter((list) => {
        return list.id !== action.list.id;
      });
      newState.changeList = newChangeList;
      return newState;
    case ERROR_LIST:
      newState = { ...state };
      return newState;

    case DELETE_TASK:
      newState = { ...state };
      let resetTime = action.task.resetTime;
      let category = action.task.category;
      let completed = action.task.completed ? "complete" : "incomplete";

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

      if (newState.list[0].id === action.task.listId) {
        newState.list[0].Tasks[time][ctgy][cmplt][action.task.id] = action.task;
      }
      return newState;
    case EDIT_LIST:
      newState = { ...state };
      newState.editingList = action.list;
      newState.list = [action.list];

      return newState;
    case SORT_LIST:
      newState = { ...state };
      newState.changeList = action.lists;
      return newState;
    case SORT_UPDATE_LIST:
      newState = { ...state };
      newState.lists = action.lists;
      newState.changeList = action.lists;
      return newState;
    case STORE_CHANGE_LIST:
      newState = { ...state };
      if (action.lists.type === "open") {
        newState.storeChangeList = action.lists.lists;
      } else {
        newState.changeList = newState.storeChangeList;
      }
      return newState;
    case CHECK_CHARACTER:
      newState = { ...state };
      newState.characterCheck = action.character;
      return newState;
    case EDIT_TASK:
      newState = { ...state };
      const x = action.task.resetTime;
      const y = action.task.category;
      const z = action.task.completed ? "complete" : "incomplete";
      const opposite = !action.task.completed ? "complete" : "incomplete";

      if (newState.list[0].id === action.task.listId) {
        newState.list[0].Tasks[x][y][z][action.task.id] = action.task;
      }

      delete newState.list[0].Tasks[x][y][opposite][action.task.id];

      return newState;
    case RESET_DAILY_TASKS:
      newState = { ...state };
      const taskArr = action.tasks;
      const listId = newState.list[0].id;

      for (let i = 0; i < taskArr.length; i++) {
        let task = taskArr[i];

        if (
          newState.list[0].Tasks[task.resetTime][task.category]["complete"][
            task.id
          ] &&
          task.listId === listId
        ) {
          delete newState.list[0].Tasks[task.resetTime][task.category][
            "complete"
          ][task.id];
        }
        if (listId === task.listId) {
          newState.list[0].Tasks[task.resetTime][task.category]["incomplete"][
            task.id
          ] = task;
        }
      }

      return newState;
    case RESET_WEEKLY_BOSSES:
      newState = { ...state };
      const tasksArr = action.tasks;
      const list_id = newState.list[0].id;

      for (let i = 0; i < tasksArr.length; i++) {
        let task = tasksArr[i];

        if (
          newState.list[0].Tasks[task.resetTime][task.category]["complete"][
            task.id
          ] &&
          task.listId === list_id
        ) {
          delete newState.list[0].Tasks[task.resetTime][task.category][
            "complete"
          ][task.id];
        }
        if (list_id === task.listId) {
          newState.list[0].Tasks[task.resetTime][task.category]["incomplete"][
            task.id
          ] = task;
        }
      }

      return newState;
    case RESET_WEEKLY_TASKS:
      newState = { ...state };
      const task_Array = action.tasks;
      const list_Id = newState.list[0].id;

      for (let i = 0; i < task_Array.length; i++) {
        let task = task_Array[i];

        if (
          newState.list[0].Tasks[task.resetTime][task.category]["complete"][
            task.id
          ] &&
          task.listId === list_Id
        ) {
          delete newState.list[0].Tasks[task.resetTime][task.category][
            "complete"
          ][task.id];
        }
        if (list_Id === task.listId) {
          newState.list[0].Tasks[task.resetTime][task.category]["incomplete"][
            task.id
          ] = task;
        }
      }

      return newState;
    case GET_LIST:
      newState = { ...state, list: {} };
      const list = action.list;
      newState.list = list;

      return newState;

    case CLEAR_LISTS:
      return {
        lists: {},
        list: {},
        isLoading: false,
        editingList: {},
        errors: {},
        changeList: [],
        storeChangeList: [],
      };
    default:
      return state;
  }
};

export default listReducer;
