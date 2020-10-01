import axios from "axios";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_INPROCESS,
} from "../actiontypes/logintypes";

export const LoginInProcess = () => {
  return {
    type: LOGIN_INPROCESS,
    isLoading: true,
  };
};

export const LoginSuccess = (message, statusCode) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      message,
      statusCode,
    },
    isLoading: false,
  };
};

export const LoginFailed = (message, statusCode) => {
  return {
    type: LOGIN_FAILED,
    error: {
      message,
      statusCode,
    },
    isLoading: false,
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(LoginInProcess);
    axios
      .post("http://localhost:8000/login/", data, { withCredentials: true })
      .then((res) => dispatch(LoginSuccess(res.data.access, res.status)))
      .catch(
        (err) => {
          dispatch(
            LoginFailed(err.response.data, err.response.data.status_code)
          );
        }
        // console.log(err.response.data)
      );
  };
};
