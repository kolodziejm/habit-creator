import { SET_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
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
        isAuthenticated: false
      }

    default:
      return state;
  }
}