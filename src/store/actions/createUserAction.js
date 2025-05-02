export const FETCH_CREATE_USERS_REQUEST = 'FETCH_CREATE_USERS_REQUEST';
export const FETCH_CREATE_USERS_SUCCESS = 'FETCH_CREATE_USERS_SUCCESS';
export const FETCH_CREATE_USERS_FAILURE = 'FETCH_CREATE_USERS_FAILURE';

export const fetchCreateUsersRequest = (name, email, password, canCreateTasks, canEditTasks, canCreateOrders, canEditOrders, canDeleteOrders, role) => ({
    type: FETCH_CREATE_USERS_REQUEST,
    payload: { name, email, password, canCreateTasks, canEditTasks, canCreateOrders, canEditOrders, canDeleteOrders, role }
});

export const fetchCreateUsersSuccess = (data) => ({
    type: FETCH_CREATE_USERS_SUCCESS,
    payload: data,
});

export const fetchCreateUsersFailure = (error) => ({
    type: FETCH_CREATE_USERS_FAILURE,
    payload: error,
});
