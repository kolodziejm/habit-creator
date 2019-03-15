import dispatch from "redux-thunk";
import axios from "../config/axios";

import {
  SET_USER,
  LOGOUT_USER,
  CLEAR_EXPIRED_INFO,
  SET_LOGIN_INFO
} from "./types";

export const setUser = userData => dispatch => {
  axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
  dispatch({
    type: SET_USER,
    payload: userData
  });
};

export const logoutUser = (history, withMessage) => dispatch => {
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: LOGOUT_USER,
    withMessage
  });
  localStorage.removeItem("jwtToken");
  history ? history.push("/login") : (window.location.href = "/login");
};

export const clearExpiredInfo = () => ({
  type: CLEAR_EXPIRED_INFO
});

export const setLoginInfo = message => ({
  type: SET_LOGIN_INFO,
  message
});
