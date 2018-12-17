import dispatch from 'redux-thunk';
import axios from '../config/axios';

import { SET_USER, LOGOUT_USER, CLEAR_EXPIRED_INFO } from './types';

export const setUser = userData => dispatch => {
  axios.defaults.headers.common['Authorization'] = localStorage.jwtToken;
  dispatch({
    type: SET_USER,
    payload: userData
  })
};

export const logoutUser = (history, withMessage) => dispatch => {
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: LOGOUT_USER,
    withMessage
  })
  localStorage.removeItem('jwtToken');
  history ? history.push('/') : window.location.href = '/';
};

export const clearExpiredInfo = () => ({
  type: CLEAR_EXPIRED_INFO
});