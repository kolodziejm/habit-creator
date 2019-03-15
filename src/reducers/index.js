import { combineReducers } from 'redux';

import habitReducer from './habitReducer';
import authReducer from './authReducer';
import shopReducer from './shopReducer';
import achievementReducer from './achievementReducer';

export default combineReducers({
  habit: habitReducer,
  auth: authReducer,
  shop: shopReducer,
  achiev: achievementReducer
});