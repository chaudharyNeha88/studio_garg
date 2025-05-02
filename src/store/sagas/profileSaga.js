import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_PROFILE_REQUEST, fetchProfileFailure, fetchProfileSuccess } from '../actions/profileAction';


function* fetchProfileSaga () {
  
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
     const response = yield call(api.get, '/auth/profile', {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });

     yield call(AsyncStorage.setItem, 'userPermission', JSON.stringify(response.data));
    yield put(fetchProfileSuccess(response.data));
  } catch (error) {
    yield put(fetchProfileFailure(error.message));
  }
}

export default function* profileSaga() {
  yield takeLatest(FETCH_PROFILE_REQUEST, fetchProfileSaga);
}
