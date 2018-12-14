import { SET_HABITS, ADD_HABIT, DELETE_HABIT, EDIT_HABIT } from '../actions/types';

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

    case ADD_HABIT:
      return {
        ...state,
        habits: [action.payload, ...state.habits]
      }

    case EDIT_HABIT: {
      const habitsCopy = [...state.habits];
      const habitIndex = habitsCopy.findIndex(habit => habit._id === action.payload.habitId);
      habitsCopy[habitIndex].name = action.payload.newName;
      return {
        ...state,
        habits: habitsCopy
      }
    }

    case DELETE_HABIT:
      return {
        ...state,
        habits: state.habits.filter(habit => habit._id !== action.habitId)
      }

    default:
      return state;
  }
}