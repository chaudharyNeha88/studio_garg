import { FETCH_STOCK_LIST_FAILURE, FETCH_STOCK_LIST_REQUEST, FETCH_STOCK_LIST_SUCCESS } from "../actions/stockListAction";

const initialState = {
    loadingStockList: false,
    dataStockList: null,
    errorStockList: null,
};

const stockListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STOCK_LIST_REQUEST:
            return {
                ...state,
                loadingStockList: true,
                errorStockList: null,
            };
        case FETCH_STOCK_LIST_SUCCESS:
            return {
                ...state,
                loadingStockList: false,
                dataStockList: action.payload,
            };
        case FETCH_STOCK_LIST_FAILURE:
            return {
                ...state,
                loadingStockList: false,
                errorStockList: action.payload,
            };
        default:
            return state;
    }
};

export default stockListReducer;
