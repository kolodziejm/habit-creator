import { SET_SHOP, ADD_REWARD } from '../actions/types';

const initialState = {
  rewards: [],
  coins: null,
  loading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOP:
      return {
        ...state,
        rewards: action.payload.rewards,
        coins: action.payload.coins,
        loading: false
      }

    case ADD_REWARD:
      return {
        ...state,
        rewards: [action.reward, ...state.rewards]
      }

    default:
      return state;
  }
}