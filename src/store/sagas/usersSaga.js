import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_USERS_REQUEST, fetchUsersFailure, fetchUsersSuccess } from '../actions/usersAction';


function* fetchUserSaga () {
  
  try {
     // Retrieve the user data from AsyncStorage
     const user = yield call(AsyncStorage.getItem, 'user');
     if (!user) {
       throw new Error('User not found in storage');
     }
 
     const parsedUser = JSON.parse(user);
     const token = parsedUser?.token; // Adjust this according to the structure of your stored user data
     if (!token) {
       throw new Error('Token not found');
     }
     const response = yield call(api.get, '/auth', {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
 
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUserSaga);
}
