import { FETCH_LIST_FAILURE, FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS } from "../actions/productListAction";

const initialState = {
    loadingList: false,
    dataList: null,
    errorList: null,
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LIST_REQUEST:
            return {
                ...state,
                loadingList: true,
                errorList: null,
            };
        case FETCH_LIST_SUCCESS:
            return {
                ...state,
                loadingList: false,
                dataList: action.payload,
            };
        case FETCH_LIST_FAILURE:
            return {
                ...state,
                loadingList: false,
                errorList: action.payload,
            };
        default:
            return state;
    }
};

export default listReducer;
