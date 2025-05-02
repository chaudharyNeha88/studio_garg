import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_STOCK_LIST_REQUEST, fetchStockListFailure, fetchStockListSuccess } from '../actions/stockListAction';


function* fetchStockListSaga () {
  
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
     const response = yield call(api.get, '/stock', {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
 
    yield put(fetchStockListSuccess(response.data));

  } catch (error) {

    yield put(fetchStockListFailure(error.response.data.message));
  }
}

export default function* stockListSaga() {
  yield takeLatest(FETCH_STOCK_LIST_REQUEST, fetchStockListSaga);
}
