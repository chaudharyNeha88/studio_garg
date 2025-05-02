export const FETCH_EDIT_ITEM_REQUEST = 'FETCH_EDIT_ITEM_REQUEST';
export const FETCH_EDIT_ITEM_SUCCESS = 'FETCH_EDIT_ITEM_SUCCESS';
export const FETCH_EDIT_ITEM_FAILURE = 'FETCH_EDIT_ITEM_FAILURE';

export const fetchEditItemRequest = (id,data, navigation) => ({
    type: FETCH_EDIT_ITEM_REQUEST,
    payload: { id,data, navigation }
});

export const fetchEditItemSuccess = (data) => ({
    type: FETCH_EDIT_ITEM_SUCCESS,
    payload: data,
});

export const fetchEditItemFailure = (error) => ({
    type: FETCH_EDIT_ITEM_FAILURE,
    payload: error,
});
