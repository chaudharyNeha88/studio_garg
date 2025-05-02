import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "../actions/usersAction";


const initialState = {
    loadingUsers: false,
    dataUsers: null,
    errorUsers: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loadingUsers: true,
                errorUsers: null,
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loadingUsers: false,
                dataUsers: action.payload,
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loadingUsers: false,
                errorUsers: action.payload,
            };
        default:
            return state;
    }
};

export default usersReducer;
