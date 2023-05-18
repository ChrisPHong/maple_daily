const CREATE_TASK = "task/CREATE";
const GET_TASKS = "tasks/GET";

const { csrfFetch } = require("../store/csrf");

export const createList = (list) => {
  return {
    type: CREATE_TASK,
    list,
  };
};
export const getTasks = (tasks) =>{
  return{
    type: GET_TASKS,
    tasks
  }
}

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
    dispatch(createList(task));
  }
};

export const fetchTasks = (data) => async (dispatch) => {
  const res = await csrfFetch(`/api/tasks/${data.listId}`);
  if (res.ok) {
    const tasks = await res.json();
    dispatch(getTasks(tasks));
  }
};
const initialState = { entries: {}, tasks: {}, isLoading: true };

const taskReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_TASK:
      newState = {
        ...state,
        tasks: { ...state.lists, [action.list.id]: action.list },
      };
      return newState;
    case GET_TASKS:
      newState = {...state}
      const { tasks } = action.tasks;
      tasks.map((task)=>{
        return newState.tasks[task.id] = task
      })
      return newState;
    default:
      return state;
  }
};

export default taskReducer;
