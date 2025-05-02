// src/store/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';
import profileReducer from './profileReducer';
import usersReducer from './usersReducer';
import createUsersReducer from './createUserReducer';
import createItemReducer from './createItemReducer';
import listReducer from './productListReducer';
import updateUserReducer from './userUpdateReducer';
import deleteOrderReducer from './deleteOrderReducer';
import editItemReducer from './editItemReducer';
import createStockReducer from './createStockReducer';
import stockListReducer from './stockListReducer';
import deleteStockReducer from './deleteStockReducer';
import editStockReducer from './editStockReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
  userData:usersReducer,
  createUser:createUsersReducer,
  createItem:createItemReducer,
  listItem:listReducer,
  updateUser:updateUserReducer,
  deleteOrder:deleteOrderReducer,
  editItem:editItemReducer,
  createStock:createStockReducer,
  stockList:stockListReducer,
  deleteStock:deleteStockReducer,
  editStock:editStockReducer
});

export default rootReducer;
