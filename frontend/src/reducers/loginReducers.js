const initialState = {
  response: {
    message: "",
    statusCode: "",
  },
  isLoading: false,
};

export const rootreducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_INPROCESS":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        response: {
          message: action.payload.message,
          statusCode: action.payload.statusCode,
        },
        isLoading: false,
      };
    case "LOGIN_FAILED":
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
