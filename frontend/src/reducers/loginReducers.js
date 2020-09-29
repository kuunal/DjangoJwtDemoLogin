const initialState = {
  response: "",
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
        response: action.payload,
        isLoading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        response: action.error,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
