import {
  REQUESTING_TOKEN,
  GET_TOKEN,
  GET_TOKEN_FAILED,
} from "../actiontypes/tokentypes";
import axios from "axios";

const requestingToken = () => ({
  type: REQUESTING_TOKEN,
  isLoading: true,
});

const getToken = (message, statusCode) => ({
  type: GET_TOKEN,
  payload: {
    message,
    statusCode,
  },
  isLoading: false,
});

const getTokenFailed = (message, statusCode) => ({
  type: GET_TOKEN_FAILED,
  payload: {
    message,
    statusCode,
  },
  isLoading: false,
});

export const requestToken = (refreshTokenURI) => {
  return (dispatch) => {
    dispatch(requestingToken);
    axios
      .get(refreshTokenURI, { withCredentials: true })
      .then((res) => dispatch(getToken(res.data.access, res.data.status_codes)))
      .catch((err) => {
        dispatch(getTokenFailed("invalid", err.response.data.status_code));
      });
  };
};
