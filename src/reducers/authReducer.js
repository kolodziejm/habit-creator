import { SET_USER, LOGOUT_USER, CLEAR_EXPIRED_INFO, SET_LOGIN_INFO } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  expiredInfo: '',
  loginInfo: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      }

    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        expiredInfo: action.withMessage ? 'Token has expired, log in again' : ''
      }

    case CLEAR_EXPIRED_INFO:
      return {
        ...state,
        expiredInfo: '',
        loginInfo: ''
      }

    case SET_LOGIN_INFO:
      return {
        ...state,
        loginInfo: action.message
      }

    default:
      return state;
  }
}