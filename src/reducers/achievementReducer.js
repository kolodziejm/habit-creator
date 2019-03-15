import { SET_ACHIEVEMENTS, UPDATE_ACHIEVEMENT } from '../actions/types';

const initialState = {
  loading: true,
  achievements: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACHIEVEMENTS:
      return {
        ...state,
        achievements: action.achievements,
        loading: false
      }

    case UPDATE_ACHIEVEMENT:
      return {
        ...state,

      }

    default:
      return state;
  }
}