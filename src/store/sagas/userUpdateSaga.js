import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { FETCH_UPDATE_USER_REQUEST, fetchUpdateUserFailure, fetchUpdateUserSuccess } from '../actions/userUpdateAction';


function* fetchUpdateUserSaga(action) {

    try {
        const { userId, canCreateTasks, canEditTasks, canCreateOrders, canEditOrders, canDeleteOrders, role } = action.payload
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
        const response = yield call(api.put, '/auth/updateUser', {
            "userId": userId,
            "permissions": {
                "canCreateTasks": canCreateTasks,
                "canEditTasks": canEditTasks,
                "canCreateOrders": canCreateOrders,
                "canEditOrders": canEditOrders,
                "canDeleteOrders": canDeleteOrders
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
console.log(response);

        yield put(fetchUpdateUserSuccess(response.data));
        ToastAndroid.show('User Updated Successfully', ToastAndroid.LONG)
    } catch (error) {
     
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG)
        yield put(fetchUpdateUserFailure(error.message));
    }
}

export default function* updateUserSaga() {
    yield takeLatest(FETCH_UPDATE_USER_REQUEST, fetchUpdateUserSaga);
}
