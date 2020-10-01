import {
  REQUESTING_TOKEN,
  GET_TOKEN,
  GET_TOKEN_FAILED,
} from "../actiontypes/tokentypes";

const initialState = {
  response: {
    message: "",
    statusCode: "",
  },
  isLoading: false,
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTING_TOKEN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_TOKEN:
      return {
        response: {
          message: action.payload.message,
          statusCode: action.payload.statusCode,
        },
        isLoading: false,
      };
    case GET_TOKEN_FAILED:
      return {
        response: {
          message: action.error.message,
          statusCode: action.error.statusCode,
        },
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
