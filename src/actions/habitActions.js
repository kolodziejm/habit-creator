import dispatch from 'redux-thunk';
import axios from '../config/axios';

import { SET_HABITS, ADD_HABIT, DELETE_HABIT, EDIT_HABIT } from './types';

export const setHabits = habits => ({
  type: SET_HABITS,
  payload: habits
});

export const addHabit = habit => ({
  type: ADD_HABIT,
  payload: habit
})

export const editHabit = (habitId, newName) => ({
  type: EDIT_HABIT,
  payload: {
    habitId,
    newName
  }
});

export const deleteHabit = habitId => ({
  type: DELETE_HABIT,
  habitId
});