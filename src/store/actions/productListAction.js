export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';

export const fetchListRequest = () => ({
  type: FETCH_LIST_REQUEST,
});

export const fetchListSuccess = (data) => ({
  type: FETCH_LIST_SUCCESS,
  payload: data,
});

export const fetchListFailure = (error) => ({
  type: FETCH_LIST_FAILURE,
  payload: error,
});
