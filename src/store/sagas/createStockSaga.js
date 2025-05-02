import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { FETCH_CREATE_STOCK_REQUEST, fetchCreateStockFailure, fetchCreateStockSuccess } from '../actions/createStockAction';


function* fetchCreateStockSaga(action) {
    try {
        const { data,navigation } = action.payload
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
        const response = yield call(api.post, '/stock', data , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        yield put(fetchCreateStockSuccess(response.data));
        navigation?.navigate('StockList')
        ToastAndroid.show('Stock Created Successfully', ToastAndroid.LONG)
    } catch (error) {
        console.log(error.response);
        
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG)
        yield put(fetchCreateStockFailure(error.message));
    }
}

export default function* createStockSaga() {
    yield takeLatest(FETCH_CREATE_STOCK_REQUEST, fetchCreateStockSaga);
}
