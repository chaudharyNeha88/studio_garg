import { FETCH_EDIT_ITEM_FAILURE, FETCH_EDIT_ITEM_REQUEST, FETCH_EDIT_ITEM_SUCCESS } from "../actions/editItemAction";

const initialState = {
    loadingEditItem: false,
    dataEditItem: null,
    errorEditItem: null,
};

const editItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EDIT_ITEM_REQUEST:
            return {
                ...state,
                loadingEditItem: true,
                errorEditItem: null,
            };
        case FETCH_EDIT_ITEM_SUCCESS:
            return {
                ...state,
                loadingEditItem: false,
                dataEditItem: action.payload,
            };
        case FETCH_EDIT_ITEM_FAILURE:
            return {
                ...state,
                loadingEditItem: false,
                errorEditItem: action.payload,
            };
        default:
            return state;
    }
};

export default editItemReducer;
