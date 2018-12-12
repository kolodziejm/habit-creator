import { SET_HABITS } from '../actions/types';

const initialState = {
  habits: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_HABITS:
      return {
        ...state,
        habits: action.payload
      }

    default:
      return state;
  }
}