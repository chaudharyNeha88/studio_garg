import { FETCH_EDIT_STOCK_FAILURE, FETCH_EDIT_STOCK_REQUEST, FETCH_EDIT_STOCK_SUCCESS } from "../actions/editStockAction";

const initialState = {
    loadingEditStock: false,
    dataEditStock: null,
    errorEditStock: null,
};

const editStockReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EDIT_STOCK_REQUEST:
            return {
                ...state,
                loadingEditStock: true,
                errorEditStock: null,
            };
        case FETCH_EDIT_STOCK_SUCCESS:
            return {
                ...state,
                loadingEditStock: false,
                dataEditStock: action.payload,
            };
        case FETCH_EDIT_STOCK_FAILURE:
            return {
                ...state,
                loadingEditStock: false,
                errorEditStock: action.payload,
            };
        default:
            return state;
    }
};

export default editStockReducer;
