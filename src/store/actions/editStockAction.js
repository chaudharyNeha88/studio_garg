export const FETCH_EDIT_STOCK_REQUEST = 'FETCH_EDIT_STOCK_REQUEST';
export const FETCH_EDIT_STOCK_SUCCESS = 'FETCH_EDIT_STOCK_SUCCESS';
export const FETCH_EDIT_STOCK_FAILURE = 'FETCH_EDIT_STOCK_FAILURE';

export const fetchEditStockRequest = (id,data, navigation) => ({
    type: FETCH_EDIT_STOCK_REQUEST,
    payload: { id,data, navigation }
});

export const fetchEditStockSuccess = (data) => ({
    type: FETCH_EDIT_STOCK_SUCCESS,
    payload: data,
});

export const fetchEditStockFailure = (error) => ({
    type: FETCH_EDIT_STOCK_FAILURE,
    payload: error,
});
