import dispatch from 'redux-thunk';
import axios from '../config/axios';

import { SET_USER, LOGOUT_USER } from './types';

export const setUser = userData => dispatch => {
  axios.defaults.headers.common['Authorization'] = localStorage.jwtToken;
  dispatch({
    type: SET_USER,
    payload: userData
  })
};

export const logoutUser = history => dispatch => {
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: LOGOUT_USER
  })
  localStorage.removeItem('jwtToken');
  history ? history.push('/') : window.location.href = '/';
};