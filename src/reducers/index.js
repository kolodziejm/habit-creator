import { combineReducers } from 'redux';

import habitReducer from './habitReducer';
import authReducer from './authReducer';
import shopReducer from './shopReducer';

export default combineReducers({
  habit: habitReducer,
  auth: authReducer,
  shop: shopReducer
});