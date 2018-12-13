import dispatch from 'redux-thunk';
import axios from '../config/axios';

import { SET_HABITS, ADD_HABIT, DELETE_HABIT } from './types';

export const setHabits = habits => ({
  type: SET_HABITS,
  payload: habits
});

export const addHabit = habit => ({
  type: ADD_HABIT,
  payload: habit
})

export const deleteHabit = habitId => ({
  type: DELETE_HABIT,
  habitId
});