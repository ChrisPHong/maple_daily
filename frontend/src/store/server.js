const GET_SERVERS = "servers/GET_SERVERS";

const { csrfFetch } = require("../store/csrf");

export const getServers = (servers) => {
    return {
        type: GET_SERVERS,
        servers,
    };
};

export const fetchServers = (data) => async (dispatch) => {
    const res = await csrfFetch(`/api/server/${data.userId}`, { method: "GET" });
    if (res.ok) {
        const servers = await res.json();
        dispatch(getServers(servers));
    }
};
const initialState = { entries: {}, servers: {}, isLoading: true };

const serversReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SERVERS:
            newState = { ...state };
            const { servers } = action;
            newState.servers = servers;
            return newState;
        default:
            return state;
    }
};

export default serversReducer;
