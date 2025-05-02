export const FETCH_DELETE_ORDER_REQUEST = 'FETCH_DELETE_ORDER_REQUEST';
export const FETCH_DELETE_ORDER_SUCCESS = 'FETCH_DELETE_ORDER_SUCCESS';
export const FETCH_DELETE_ORDER_FAILURE = 'FETCH_DELETE_ORDER_FAILURE';

export const fetchDeleteOrderRequest = (id) => ({
  type: FETCH_DELETE_ORDER_REQUEST,
  payload:{ id }
});

export const fetchDeleteOrderSuccess = (data) => ({
  type: FETCH_DELETE_ORDER_SUCCESS,
  payload: data,
});

export const fetchDeleteOrderFailure = (error) => ({
  type: FETCH_DELETE_ORDER_FAILURE,
  payload: error,
});
