import { call, put, takeLatest } from 'redux-saga/effects';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FETCH_CREATE_USERS_REQUEST, fetchCreateUsersFailure, fetchCreateUsersSuccess } from '../actions/createUserAction';
import { ToastAndroid } from 'react-native';


function* fetchCreateUserSaga(action) {

    try {
        const { name, email, password, canCreateTasks, canEditTasks, canCreateOrders, canEditOrders, canDeleteOrders, role } = action.payload
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
        const response = yield call(api.post, '/auth/createUser', {
            "name": name,
            "email": email,
            "password": password,
            "role": role,
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
 
        yield put(fetchCreateUsersSuccess(response.data));
        ToastAndroid.show('User Created Successfully', ToastAndroid.LONG)
    } catch (error) {
     
        ToastAndroid.show(error.response.data.message, ToastAndroid.LONG)
        yield put(fetchCreateUsersFailure(error.message));
    }
}

export default function* createUserSaga() {
    yield takeLatest(FETCH_CREATE_USERS_REQUEST, fetchCreateUserSaga);
}
