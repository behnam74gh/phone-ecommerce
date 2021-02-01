import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Details from "./components/Details";
import Cart from "./components/Cart/Cart";
import Default from "./components/Default";
import { ProductProvider } from "./components/context/context";
import Modal from "./components/UI/Modal";
import Footer from "./components/UI/Footer";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ProductProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/details" exact component={Details} />
              <Route path="/cart" exact component={Cart} />
              <Route component={Default} />
            </Switch>
            <Footer />
            <Modal />
          </Router>
        </ProductProvider>
      </React.Fragment>
    );
  }
}

export default App;
