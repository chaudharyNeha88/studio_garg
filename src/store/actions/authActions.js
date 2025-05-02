// Login Actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = (payload, navigation) => ({
    type: LOGIN_REQUEST,
    payload: { ...payload, navigation },
});
export const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload:user });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload:error });


// Send OTP Actions
export const SEND_OTP_REQUEST = 'SEND_OTP_REQUEST';
export const SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS';
export const SEND_OTP_FAILURE = 'SEND_OTP_FAILURE';

export const sendOtpRequest = (loginId, navigation) => ({
    type: SEND_OTP_REQUEST,
    payload: { loginId, navigation },
});
export const sendOtpSuccess = () => ({ type: SEND_OTP_SUCCESS, });
export const sendOtpFailure = (error) => ({ type: SEND_OTP_FAILURE, error, });


// Reset Password
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const resetPasswordRequest = (loginId, otp, newPassword, navigation) => ({
    type: RESET_PASSWORD_REQUEST,
    payload: { loginId, otp, newPassword, navigation },
});
export const resetPasswordSuccess = () => ({ type: RESET_PASSWORD_SUCCESS });
export const resetPasswordFailure = (error) => ({ type: RESET_PASSWORD_FAILURE, error });