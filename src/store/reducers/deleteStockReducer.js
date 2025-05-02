import { FETCH_DELETE_STOCK_FAILURE, FETCH_DELETE_STOCK_REQUEST, FETCH_DELETE_STOCK_SUCCESS } from "../actions/deleteStockAction";

const initialState = {
    loadingDeleteStock: false,
    dataDeleteStock: null,
    errorDeleteStock: null,
};

const deleteStockReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DELETE_STOCK_REQUEST:
            return {
                ...state,
                loadingDeleteStock: true,
                errorDeleteStock: null,
            };
        case FETCH_DELETE_STOCK_SUCCESS:
            return {
                ...state,
                loadingDeleteStock: false,
                dataDeleteStock: action.payload,
            };
        case FETCH_DELETE_STOCK_FAILURE:
            return {
                ...state,
                loadingDeleteStock: false,
                errorDeleteStock: action.payload,
            };
        default:
            return state;
    }
};

export default deleteStockReducer;
