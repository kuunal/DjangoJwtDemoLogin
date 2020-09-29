import React from "react";
import Demo from "./demo";
import "./App.css";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Demo />
        Hello
      </div>
    </Provider>
  );
}

export default App;
