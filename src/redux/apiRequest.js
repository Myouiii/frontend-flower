//import axios from "axios";
import { publicRequest, userRequest } from "./../requestMethod";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    // .then(res => console.log("res: ", res))
    // .then(err => console.log(err));
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await userRequest.post("/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/");
  } catch (err) {
    dispatch(logoutFailed());
    //console.log(err);
  }
};
