import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/CartCount.css";

const CartCount = () => {
  const cart = useSelector((state) => state.cart);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    // <Link to="/cart" className="cart-link">
    //   <div className="cart-icon">
    <span className="cart-count"> {itemCount}</span>
    //   </div>
    // </Link>
  );
  //<span> ({itemCount})</span>;
};
export default CartCount;
