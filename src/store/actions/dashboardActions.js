export const FETCH_DASHBOARD_REQUEST = 'FETCH_DASHBOARD_REQUEST';
export const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS';
export const FETCH_DASHBOARD_FAILURE = 'FETCH_DASHBOARD_FAILURE';

export const fetchDashboardRequest = () => ({
  type: FETCH_DASHBOARD_REQUEST,
});

export const fetchDashboardSuccess = (data) => ({
  type: FETCH_DASHBOARD_SUCCESS,
  payload: data,
});

export const fetchDashboardFailure = (error) => ({
  type: FETCH_DASHBOARD_FAILURE,
  payload: error,
});
