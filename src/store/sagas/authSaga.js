// src/store/sagas/authSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';
import { LOGIN_REQUEST, loginSuccess, loginFailure, SEND_OTP_REQUEST, sendOtpSuccess, sendOtpFailure, RESET_PASSWORD_REQUEST, resetPasswordSuccess, resetPasswordFailure } from '../actions/authActions';
import { Alert, ToastAndroid } from 'react-native';

function* loginSaga(action) {

  try {
    const { login_id, password, navigation } = action.payload;
    const response = yield call(api.post, '/auth/login', { email:login_id, password:password });
    if (response.data.success) {
      yield put(loginSuccess(response.data));
      yield call(AsyncStorage.setItem, 'user', JSON.stringify(response.data));
      navigation.navigate('DrawerNavigator');
      ToastAndroid.show('Logged In successfully', ToastAndroid.SHORT);
    } else {
      yield put(loginFailure(response.data.message));
    }

  } catch (error) {
    ToastAndroid.show('Please check Id & Password', ToastAndroid.SHORT);
  //   if (error?.response?.data?.errors) {
  //     // Extract error messages
  //     const errorMessages = Object.entries(error?.response?.data?.errors)
  //         .map(([key, messages]) => `${messages.join('\n')}`) // Join multiple messages if any
  //         .join('\n'); // Separate different fields by a new line

  //     Alert.alert(
  //         "Validation Error", // Title
  //         errorMessages, // Message
  //         [{ text: "OK", onPress: () => console.log("OK Pressed") }]
  //     );
  // } else {
  //     Alert.alert("Error", "Something went wrong. Please try again.");
  // }
    yield put(loginFailure(error?.response?.data?.message));
  }
}

function* sendOtpSaga(action) {
  try {
    const { loginId, navigation } = action.payload;
    const response = yield call(api.get, '/send-reset-password-otp', {
      params: { login_id: loginId },
    });

    if (response.data.success) {
      yield put(sendOtpSuccess());
      navigation ? navigation.navigate('OTPScreen', { LoginID: loginId }) : null
      ToastAndroid.show('OTP sent successfully. Please check your registered mobile.', ToastAndroid.SHORT);
    } else {
      yield put(sendOtpFailure(response.data.message));
    }
  } catch (error) {
   
    Alert.alert(
      'Alert', // Title of the alert
      error?.response?.data?.message, // Message
      [
          {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel', // 'cancel' or 'destructive'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false } // Prevent dismissing by tapping outside
  );
    yield put(sendOtpFailure(error?.response?.data?.message));
  }
}

function* resetPasswordSaga(action) {
  try {
    const { loginId, otp, newPassword, navigation } = action.payload;
    const response = yield call(api.post, '/reset-password', {
      login_id: loginId,
      otp: otp,
      password: newPassword,
    });
    if (response.data.success) {
      yield put(resetPasswordSuccess(response.data));
      navigation.navigate('Login');
      ToastAndroid.show('Password Reset successfully', ToastAndroid.SHORT);
    } else {
      yield put(resetPasswordFailure(response.data.message));
    }
  } catch (error) {
    Alert.alert(
      'Alert', // Title of the alert
      error?.response?.data?.message, // Message
      [
          {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel', // 'cancel' or 'destructive'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false } // Prevent dismissing by tapping outside
  );
    yield put(resetPasswordFailure(error?.response?.data?.message));
  }
}

function* watchLoginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(SEND_OTP_REQUEST, sendOtpSaga);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}

export default watchLoginSaga;
