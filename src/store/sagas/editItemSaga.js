import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { FETCH_EDIT_ITEM_REQUEST, fetchEditItemFailure, fetchEditItemSuccess } from '../actions/editItemAction';

function* fetchEditItemSaga(action) {
    console.log(action.payload);
    
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
        const response = yield call(api.put, `/order/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        yield put(fetchEditItemSuccess(response.data));
        if(navigation){
        navigation?.navigate('ProductList')}
        ToastAndroid.show('Update Item Successfully', ToastAndroid.LONG)
    } catch (error) {
        console.log(error.response);

        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG)
        yield put(fetchEditItemFailure(error.message));
    }
}

export default function* editItemSaga() {
    yield takeLatest(FETCH_EDIT_ITEM_REQUEST, fetchEditItemSaga);
}
