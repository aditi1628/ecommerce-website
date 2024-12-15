import React from "react"; //to  create component
import { useSelector, useDispatch } from "react-redux"; //to access the redux store
import {
  removeItemFromCart,
  updateItemQuantity,
  clearBuyNowItem,
} from "../redux/cartSlice";
import "../styles/Checkout.css"; //for styling the component

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items) || []; //uses useSelector to access the cart state from the redux store
  const buyNowItem = useSelector((state) => state.cart.buyNowItem);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (item) => {
    dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateItemQuantity({ id: item.id, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItemFromCart(item.id));
    }
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart);
  };

  const handleCheckout = () => {
    dispatch(clearBuyNowItem());
  };

  const itemsToDisplay = buyNowItem ? [buyNowItem] : cartItems;

  const totalAmount = itemsToDisplay.reduce((total, item) => {
    const itemTotal = (item.price || 0) * (item.quantity || 0);
    return total + itemTotal;
  }, 0);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form className="checkout-form">
        <label>Email:</label>
        <input type="email" name="email" required />

        <label>Mobile Number</label>
        <input type="text" name="mobile" required />

        <label>Delivery Address</label>
        <textarea name="address" required></textarea>
        <h3>Order Summary</h3>
        {cartItems.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          //uses a conditional operator to check if product is not null
          <div className="checkout-items">
            {itemsToDisplay.map((item) => (
              <div key={item.id} className="checkout-item">
                <h3>{item.title}</h3>
                {/* if product is not null it renders a div with the class name 'order-summary' displaying the product's category, description, price, rating and quantity*/}
                <p>Category: {item.category}</p>
                <p>Description: {item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Rating: {item.rating}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
            <div className="checkout-total">
              <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            </div>
          </div>
        )}

        <button type="submit" onClick={handleCheckout}>
          Pay
        </button>
      </form>
    </div>
  );
};

export default Checkout;
