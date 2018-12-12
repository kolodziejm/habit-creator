import dispatch from 'redux-thunk';
import axios from '../config/axios';

import { SET_HABITS } from './types';

export const setHabits = habits => dispatch => {
  dispatch({
    type: SET_HABITS,
    payload: habits
  })
};