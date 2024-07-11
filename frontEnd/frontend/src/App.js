import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import AddEditProduct from "./components/AddEditProduct";
import Logs from "./components/Logs";

const App = () => {
  const [token, setToken] = useState("");

  if (!token) {
    return (
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login setToken={setToken} />
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/products">
          <ProductList token={token} />
        </Route>
        <Route path="/add-product">
          <AddEditProduct token={token} />
        </Route>
        <Route path="/edit-product/:id">
          <AddEditProduct token={token} />
        </Route>
        <Route path="/logs">
          <Logs token={token} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
