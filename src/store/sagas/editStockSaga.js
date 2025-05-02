import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { FETCH_EDIT_STOCK_REQUEST, fetchEditStockFailure, fetchEditStockSuccess } from '../actions/editStockAction';

function* fetchEditStockSaga(action) {

    try {
        const { id, data, navigation } = action.payload
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
        const response = yield call(api.put, `/stock/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        yield put(fetchEditStockSuccess(response.data));
        if(navigation){
        navigation?.navigate('StockList')}
        ToastAndroid.show('Update Stock Successfully', ToastAndroid.LONG)
    } catch (error) {
        console.log(error.response);

        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG)
        yield put(fetchEditStockFailure(error.message));
    }
}

export default function* editStockSaga() {
    yield takeLatest(FETCH_EDIT_STOCK_REQUEST, fetchEditStockSaga);
}
