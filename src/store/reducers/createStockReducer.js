import { FETCH_CREATE_STOCK_FAILURE, FETCH_CREATE_STOCK_REQUEST, FETCH_CREATE_STOCK_SUCCESS } from "../actions/createStockAction";

const initialState = {
    loadingCreateStock: false,
    dataCreateStock: null,
    errorCreateStock: null,
};

const createStockReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CREATE_STOCK_REQUEST:
            return {
                ...state,
                loadingCreateStock: true,
                errorCreateStock: null,
            };
        case FETCH_CREATE_STOCK_SUCCESS:
            return {
                ...state,
                loadingCreateStock: false,
                dataCreateStock: action.payload,
            };
        case FETCH_CREATE_STOCK_FAILURE:
            return {
                ...state,
                loadingCreateStock: false,
                errorCreateStock: action.payload,
            };
        default:
            return state;
    }
};

export default createStockReducer;
