export const FETCH_CREATE_STOCK_REQUEST = 'FETCH_CREATE_STOCK_REQUEST';
export const FETCH_CREATE_STOCK_SUCCESS = 'FETCH_CREATE_STOCK_SUCCESS';
export const FETCH_CREATE_STOCK_FAILURE = 'FETCH_CREATE_STOCK_FAILURE';

export const fetchCreateStockRequest = (data, navigation) => ({
    type: FETCH_CREATE_STOCK_REQUEST,
    payload: { data, navigation }
});

export const fetchCreateStockSuccess = (data) => ({
    type: FETCH_CREATE_STOCK_SUCCESS,
    payload: data,
});

export const fetchCreateStockFailure = (error) => ({
    type: FETCH_CREATE_STOCK_FAILURE,
    payload: error,
});
