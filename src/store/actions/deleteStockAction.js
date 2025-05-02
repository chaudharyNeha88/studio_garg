export const FETCH_DELETE_STOCK_REQUEST = 'FETCH_DELETE_STOCK_REQUEST';
export const FETCH_DELETE_STOCK_SUCCESS = 'FETCH_DELETE_STOCK_SUCCESS';
export const FETCH_DELETE_STOCK_FAILURE = 'FETCH_DELETE_STOCK_FAILURE';

export const fetchDeleteStockRequest = (id) => ({
  type: FETCH_DELETE_STOCK_REQUEST,
  payload:{ id }
});

export const fetchDeleteStockSuccess = (data) => ({
  type: FETCH_DELETE_STOCK_SUCCESS,
  payload: data,
});

export const fetchDeleteStockFailure = (error) => ({
  type: FETCH_DELETE_STOCK_FAILURE,
  payload: error,
});
