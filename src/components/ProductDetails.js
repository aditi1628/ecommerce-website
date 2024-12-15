import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { addItemToCart, setBuyNowItem } from "../redux/cartSlice";
import { fetchProductById } from "../redux/actions/productActions";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1); //state for quantity of product to add to cart
  const dispatch = useDispatch(); //redux dispatch function
  const navigate = useNavigate(); //to handle navigation using useNavigate hook
  const { id } = useParams();

  const productState = useSelector((state) => state.products);
  const { product, loading, error } = productState || {};

  const cartItems = useSelector((state) => state.cart.items) || [];

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      const productWithDefaults = {
        ...product,
        quantity: quantity || 1,
        price: product.price || 0,
      };
      dispatch(addItemToCart(productWithDefaults));
      navigate("/cart");
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const productWithDefaults = {
        ...product,
        quantity: quantity || 1,
        price: product.price || 0,
      };
      dispatch(setBuyNowItem(productWithDefaults));
      navigate("/checkout");
    }
  };

  const handleQuantityChange = (e) => {
    //function to handle quantity change in the input field
    setQuantity(Number(e.target.value) || 1); //setting quantity state based on input value
  };

  //JSX structure for displaying product details and interaction buttons
  return (
    <div className="product-details-container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : product ? (
        <div className="product-item">
          <div className="image-container">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="image-details">
            <h2>{product.title}</h2>
            <p>Category: {product.category}</p>
            <h4>Price: ${product.price?.toFixed(2)}</h4>
            <p>Description: {product.description}</p>
            <div className="quantity-input">
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>
            <div className="button-container">
              <button className="add-to-cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now-button" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>No product found </div>
      )}
    </div>
  );
};

export default ProductDetails;
