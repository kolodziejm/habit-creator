import dispatch from 'redux-thunk';
import axios from '../config/axios';

import { SET_HABITS, ADD_HABIT } from './types';

export const setHabits = habits => dispatch => {
  dispatch({
    type: SET_HABITS,
    payload: habits
  })
};

export const addHabit = habit => dispatch => {
  dispatch({
    type: ADD_HABIT,
    payload: habit
  })
}