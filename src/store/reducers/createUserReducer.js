import { FETCH_CREATE_USERS_FAILURE, FETCH_CREATE_USERS_REQUEST, FETCH_CREATE_USERS_SUCCESS } from "../actions/createUserAction";


const initialState = {
    loadingCreateUsers: false,
    dataCreateUsers: null,
    errorCreateUsers: null,
};

const createUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CREATE_USERS_REQUEST:
            return {
                ...state,
                loadingCreateUsers: true,
                errorCreateUsers: null,
            };
        case FETCH_CREATE_USERS_SUCCESS:
            return {
                ...state,
                loadingCreateUsers: false,
                dataCreateUsers: action.payload,
            };
        case FETCH_CREATE_USERS_FAILURE:
            return {
                ...state,
                loadingCreateUsers: false,
                errorCreateUsers: action.payload,
            };
        default:
            return state;
    }
};

export default createUsersReducer;
