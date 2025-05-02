import { FETCH_PROFILE_FAILURE, FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS } from "../actions/profileAction";


const initialState = {
    loadingProfile: false,
    dataProfile: null,
    errorProfile: null,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROFILE_REQUEST:
            return {
                ...state,
                loadingProfile: true,
                errorProfile: null,
            };
        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                loadingProfile: false,
                dataProfile: action.payload,
            };
        case FETCH_PROFILE_FAILURE:
            return {
                ...state,
                loadingProfile: false,
                errorProfile: action.payload,
            };
        default:
            return state;
    }
};

export default profileReducer;
