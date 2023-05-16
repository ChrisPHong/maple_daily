const CREATE_LIST = "list/CREATE";

const { csrfFetch } = require('../store/csrf')


export const createList = (list) => {
  return {
    type: CREATE_LIST,
    list,
  };
};

export const createListForm = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/lists/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    console.log(data, '<<<<<<< data');
    if(!response.ok){

        return "Please provide the correct inputs"
    }
    if (response.ok) {
        const list = await response.json()
        dispatch(createList(list))
    }

}
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
    default:
      return state;
  }
};

export default listReducer;
