import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { loginReducer } from "../reducers/loginReducers";
import { tokenReducer } from "../reducers/tokenReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootreducer = combineReducers({
  login: loginReducer,
  token: tokenReducer,
});

export const store = createStore(
  rootreducer,
  composeWithDevTools(applyMiddleware(thunk))
);
