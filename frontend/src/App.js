import React from "react";
import LoginComponent from "./components/Login";
import ProductsComponent from "./components/products/products";
import "./App.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App" style={container}>
          <Route path="/login" component={LoginComponent} />
          <Route path="/products" component={ProductsComponent} />
        </div>
      </Router>
    </Provider>
  );
}
const container = {};
export default App;
