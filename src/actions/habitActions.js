import { SET_HABITS, ADD_HABIT, DELETE_HABIT, EDIT_HABIT, FINISH_HABIT } from './types';

export const setHabits = habits => ({
  type: SET_HABITS,
  payload: habits
});

export const addHabit = habit => ({
  type: ADD_HABIT,
  payload: habit
})

export const editHabit = (habitId, newName, newColor, newDiff) => ({
  type: EDIT_HABIT,
  payload: {
    habitId,
    newName,
    newColor,
    newDiff
  }
});

export const deleteHabit = habitId => ({
  type: DELETE_HABIT,
  habitId
});

export const finishHabit = habitId => ({
  type: FINISH_HABIT,
  habitId
})