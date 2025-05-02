import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import { FETCH_DASHBOARD_REQUEST, fetchDashboardFailure, fetchDashboardSuccess } from '../actions/dashboardActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


function* fetchDashboardSaga () {
  const user = yield call(AsyncStorage.getItem, 'user');
  try {
     // Retrieve the user data from AsyncStorage
     const user = yield call(AsyncStorage.getItem, 'user');
     if (!user) {
       throw new Error('User not found in storage');
     }
 
     const parsedUser = JSON.parse(user);
     const token = parsedUser?.data?.token; // Adjust this according to the structure of your stored user data
     if (!token) {
       throw new Error('Token not found');
     }
  
     const response = yield call(api.get, '/home', {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
    yield put(fetchDashboardSuccess(response.data));
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
    yield put(fetchDashboardFailure(error.response.data.message));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(FETCH_DASHBOARD_REQUEST, fetchDashboardSaga);
}
