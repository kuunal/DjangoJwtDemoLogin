import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { rootreducer } from "../reducers/loginReducers";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  rootreducer,
  composeWithDevTools(applyMiddleware(thunk))
);
