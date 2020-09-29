import axios from "axios";
// const LOGIN_INPROCESS = "LOGIN in process";
// const

export const LoginInProcess = () => {
  return {
    type: "LOGIN_INPROCESS",
    isLoading: true,
  };
};

export const LoginSuccess = (message) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: message,
    isLoading: false,
  };
};

export const LoginFailed = (message) => {
  return {
    type: "LOGIN_FAILED",
    error: message,
    isLoading: false,
  };
};

export const login = () => {
  return (dispatch) => {
    dispatch(LoginInProcess);
    axios
      .post(
        "http://localhost:8000/login/",
        { email: "kunaldeshmukh2503@gmail.com", password: "Kunal@123" },
        { withCredentials: true }
      )
      .then((res) => dispatch(LoginSuccess(res.data.access)))
      .catch((res) => dispatch(LoginFailed(res.error)));
  };
};
