import { SET_HABITS } from '../actions/types';

const initialState = {
  habits: [],
  loading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HABITS:
      return {
        ...state,
        habits: action.payload,
        loading: false
      }

    default:
      return state;
  }
}