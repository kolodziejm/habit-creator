import { SET_SHOP, ADD_REWARD } from './types';

export const setShop = (rewards, coins) => ({
  type: SET_SHOP,
  payload: {
    rewards,
    coins
  }
});

export const addReward = reward => ({
  type: ADD_REWARD,
  reward
})