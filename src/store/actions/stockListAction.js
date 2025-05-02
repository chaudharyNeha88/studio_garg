export const FETCH_STOCK_LIST_REQUEST = 'FETCH_STOCK_LIST_REQUEST';
export const FETCH_STOCK_LIST_SUCCESS = 'FETCH_STOCK_LIST_SUCCESS';
export const FETCH_STOCK_LIST_FAILURE = 'FETCH_STOCK_LIST_FAILURE';

export const fetchStockListRequest = () => ({
  type: FETCH_STOCK_LIST_REQUEST,
});

export const fetchStockListSuccess = (data) => ({
  type: FETCH_STOCK_LIST_SUCCESS,
  payload: data,
});

export const fetchStockListFailure = (error) => ({
  type: FETCH_STOCK_LIST_FAILURE,
  payload: error,
});
