import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { FETCH_DELETE_STOCK_REQUEST, fetchDeleteStockFailure, fetchDeleteStockSuccess } from '../actions/deleteStockAction';


function* fetchDeleteStockSaga(action) {

    try {
        const { id } = action.payload
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
        const response = yield call(api.delete, `/stock/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        yield put(fetchDeleteStockSuccess(response.data));
        ToastAndroid.show(response.data.message,ToastAndroid.LONG)
    } catch (error) {
console.log("err----",error);

        yield put(fetchDeleteStockFailure(error.message));
    }
}

export default function* deleteStockSaga() {
    yield takeLatest(FETCH_DELETE_STOCK_REQUEST, fetchDeleteStockSaga);
}
