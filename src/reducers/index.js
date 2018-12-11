import { combineReducers } from 'redux';

import habitReducer from './habitReducer';
import authReducer from './authReducer';

export default combineReducers({
  habit: habitReducer,
  auth: authReducer
});