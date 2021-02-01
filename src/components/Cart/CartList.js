import React from "react";

import CartItem from "./CartItem";

const CartList = ({ value }) => {
  const { cart } = value;

  return (
    <div className="container-fluid mt-5">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} value={value} />
      ))}
    </div>
  );
};

export default CartList;
