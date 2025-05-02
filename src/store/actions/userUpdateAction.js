export const FETCH_UPDATE_USER_REQUEST = 'FETCH_UPDATE_USER_REQUEST';
export const FETCH_UPDATE_USER_SUCCESS = 'FETCH_UPDATE_USER_SUCCESS';
export const FETCH_UPDATE_USER_FAILURE = 'FETCH_UPDATE_USER_FAILURE';

export const fetchUpdateUserRequest = (userId, canCreateTasks, canEditTasks, canCreateOrders, canEditOrders, canDeleteOrders) => ({
    type: FETCH_UPDATE_USER_REQUEST,
    payload: { userId, canCreateTasks, canEditTasks, canCreateOrders, canEditOrders, canDeleteOrders }
});

export const fetchUpdateUserSuccess = (data) => ({
    type: FETCH_UPDATE_USER_SUCCESS,
    payload: data,
});

export const fetchUpdateUserFailure = (error) => ({
    type: FETCH_UPDATE_USER_FAILURE,
    payload: error,
});
