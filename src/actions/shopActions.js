import { SET_SHOP, ADD_REWARD, EDIT_REWARD, DELETE_REWARD, UPDATE_COINS } from './types';

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

export const editReward = (id, title, price, description, imageUrl) => ({
  type: EDIT_REWARD,
  payload: {
    id,
    title,
    price,
    description: description ? description : '',
    imageUrl: imageUrl ? imageUrl : ''
  }
});

export const deleteReward = id => ({
  type: DELETE_REWARD,
  id
});

export const updateCoins = coins => ({
  type: UPDATE_COINS,
  coins
})