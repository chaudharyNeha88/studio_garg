// src/store/sagas/index.js
import { all } from 'redux-saga/effects';
import watchLoginSaga from './authSaga';
import dashboardSaga from './dashboardSaga';
import profileSaga from './profileSaga';
import userSaga from './usersSaga';
import createUserSaga from './createUserSaga';
import createItemSaga from './createItemSaga';
import listSaga from './productListSaga';
import updateUserSaga from './userUpdateSaga';
import deleteOrderSaga from './deleteOrderSaga';
import editItemSaga from './editItemSaga';
import createStockSaga from './createStockSaga';
import stockListSaga from './stockListSaga';
import editStockSaga from './editStockSaga';
import deleteStockSaga from './deleteStockSaga';


export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
    dashboardSaga(),
    profileSaga(),
    userSaga(),
    createUserSaga(),
    createItemSaga(),
    listSaga(),
    updateUserSaga(),
    deleteOrderSaga(),
    editItemSaga(),
    createStockSaga(),
    stockListSaga(),
    deleteStockSaga(),
    editStockSaga()
  ]);
}
