import { FETCH_UPDATE_USER_FAILURE, FETCH_UPDATE_USER_REQUEST, FETCH_UPDATE_USER_SUCCESS } from "../actions/userUpdateAction";

const initialState = {
    loadingUpdateUser: false,
    dataUpdateUser: null,
    errorUpdateUser: null,
};

const updateUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_UPDATE_USER_REQUEST:
            return {
                ...state,
                loadingUpdateUser: true,
                errorUpdateUser: null,
            };
        case FETCH_UPDATE_USER_SUCCESS:
            return {
                ...state,
                loadingUpdateUser: false,
                dataUpdateUser: action.payload,
            };
        case FETCH_UPDATE_USER_FAILURE:
            return {
                ...state,
                loadingUpdateUser: false,
                errorUpdateUser: action.payload,
            };
        default:
            return state;
    }
};

export default updateUserReducer;
