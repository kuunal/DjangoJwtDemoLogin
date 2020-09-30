import React from "react";
import Demo from "./demo";
import "./App.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App" style={container}>
          <Route path="/login" component={Demo} />
          <Route path="/products" />
        </div>
      </Router>
    </Provider>
  );
}
const container = {
  // width: "100%",
};
export default App;
