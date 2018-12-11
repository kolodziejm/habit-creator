import dispatch from 'redux-thunk';

import { SET_USER, LOGOUT_USER } from './types';

export const setUser = userData => dispatch => {
  dispatch({
    type: SET_USER,
    payload: userData
  })
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch({
    type: LOGOUT_USER
  })
};