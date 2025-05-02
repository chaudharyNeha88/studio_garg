export const FETCH_CREATE_ITEM_REQUEST = 'FETCH_CREATE_ITEM_REQUEST';
export const FETCH_CREATE_ITEM_SUCCESS = 'FETCH_CREATE_ITEM_SUCCESS';
export const FETCH_CREATE_ITEM_FAILURE = 'FETCH_CREATE_ITEM_FAILURE';

export const fetchCreateItemRequest = (data, navigation) => ({
    type: FETCH_CREATE_ITEM_REQUEST,
    payload: { data, navigation }
});

export const fetchCreateItemSuccess = (data) => ({
    type: FETCH_CREATE_ITEM_SUCCESS,
    payload: data,
});

export const fetchCreateItemFailure = (error) => ({
    type: FETCH_CREATE_ITEM_FAILURE,
    payload: error,
});
