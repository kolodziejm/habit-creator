import { SET_ACHIEVEMENTS, UPDATE_ACHIEVEMENT } from './types';

export const setAchievements = achievements => ({
  type: SET_ACHIEVEMENTS,
  achievements
});