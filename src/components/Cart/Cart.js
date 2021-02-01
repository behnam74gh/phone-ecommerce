import React, { Component } from "react";

import Title from "../UI/Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
import { ProductConsumer } from "../context/context";

class Cart extends Component {
  render() {
    return (
      <section className="container-fluid heightfull">
        <ProductConsumer>
          {(value) => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotal value={value} />
                </React.Fragment>
              );
            }
            return <EmptyCart />;
          }}
        </ProductConsumer>
      </section>
    );
  }
}

export default Cart;
