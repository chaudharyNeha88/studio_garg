// src/store/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, SEND_OTP_FAILURE, SEND_OTP_SUCCESS, LOGIN_REQUEST, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from '../actions/authActions';

const initialState = {
  user: null,
  error: null,
  success: false,
  loginLoader:false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, error: null, success: false,loginLoader:true };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, error: null, success: true,loginLoader:false };
    case LOGIN_FAILURE:
      return { ...state, error: action.error, success: false,loginLoader:false };
    case SEND_OTP_SUCCESS:
      return { ...state, success: true, error: null };
    case SEND_OTP_FAILURE:
      return { ...state, error: action.error, success: false };
      case RESET_PASSWORD_REQUEST:
      return { ...state, error: null, success: false };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, user: action.payload, error: null, success: true };
    case RESET_PASSWORD_FAILURE:
      return { ...state, error: action.error, success: false };
    default:
      return state;
  }
};

export default authReducer;
