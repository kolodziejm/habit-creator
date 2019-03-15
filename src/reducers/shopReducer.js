import { SET_SHOP, ADD_REWARD, EDIT_REWARD, DELETE_REWARD, UPDATE_COINS } from '../actions/types';

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

    case EDIT_REWARD: {
      const rewardsCopy = [...state.rewards];
      const { title, price, description, imageUrl } = action.payload;
      const rewardIndex = rewardsCopy.findIndex(reward => reward._id === action.payload.id);
      rewardsCopy[rewardIndex].title = title;
      rewardsCopy[rewardIndex].price = price;
      rewardsCopy[rewardIndex].description = description;
      rewardsCopy[rewardIndex].imageUrl = imageUrl;
      return {
        ...state,
        rewards: rewardsCopy
      }
    }

    case DELETE_REWARD:
      return {
        ...state,
        rewards: state.rewards.filter(reward => reward._id !== action.id)
      }

    case UPDATE_COINS:
      return {
        ...state,
        coins: action.coins
      }

    default:
      return state;
  }
}