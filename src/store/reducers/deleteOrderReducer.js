import { FETCH_DELETE_ORDER_FAILURE, FETCH_DELETE_ORDER_REQUEST, FETCH_DELETE_ORDER_SUCCESS } from "../actions/deleteOrderAction";

const initialState = {
    loadingDeleteOrder: false,
    dataDeleteOrder: null,
    errorDeleteOrder: null,
};

const deleteOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DELETE_ORDER_REQUEST:
            return {
                ...state,
                loadingDeleteOrder: true,
                errorDeleteOrder: null,
            };
        case FETCH_DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loadingDeleteOrder: false,
                dataDeleteOrder: action.payload,
            };
        case FETCH_DELETE_ORDER_FAILURE:
            return {
                ...state,
                loadingDeleteOrder: false,
                errorDeleteOrder: action.payload,
            };
        default:
            return state;
    }
};

export default deleteOrderReducer;
