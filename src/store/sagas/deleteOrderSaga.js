import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_DELETE_ORDER_REQUEST, fetchDeleteOrderFailure, fetchDeleteOrderSuccess } from '../actions/deleteOrderAction';
import { ToastAndroid } from 'react-native';


function* fetchDeleteOrderSaga(action) {

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
        const response = yield call(api.delete, `/order/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        yield put(fetchDeleteOrderSuccess(response.data));
        ToastAndroid.show(response.data.message,ToastAndroid.LONG)
    } catch (error) {

        yield put(fetchDeleteOrderFailure(error.message));
    }
}

export default function* deleteOrderSaga() {
    yield takeLatest(FETCH_DELETE_ORDER_REQUEST, fetchDeleteOrderSaga);
}
