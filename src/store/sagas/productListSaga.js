import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_LIST_REQUEST, fetchListFailure, fetchListSuccess } from '../actions/productListAction';


function* fetchListSaga () {
  
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
     const response = yield call(api.get, '/order', {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
 
    yield put(fetchListSuccess(response.data));
  } catch (error) {
    yield put(fetchListFailure(error.message));
  }
}

export default function* listSaga() {
  yield takeLatest(FETCH_LIST_REQUEST, fetchListSaga);
}
