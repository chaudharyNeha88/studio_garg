import { FETCH_CREATE_ITEM_FAILURE, FETCH_CREATE_ITEM_REQUEST, FETCH_CREATE_ITEM_SUCCESS } from "../actions/createItemAction";

const initialState = {
    loadingCreateItem: false,
    dataCreateItem: null,
    errorCreateItem: null,
};

const createItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CREATE_ITEM_REQUEST:
            return {
                ...state,
                loadingCreateItem: true,
                errorCreateItem: null,
            };
        case FETCH_CREATE_ITEM_SUCCESS:
            return {
                ...state,
                loadingCreateItem: false,
                dataCreateItem: action.payload,
            };
        case FETCH_CREATE_ITEM_FAILURE:
            return {
                ...state,
                loadingCreateItem: false,
                errorCreateItem: action.payload,
            };
        default:
            return state;
    }
};

export default createItemReducer;
