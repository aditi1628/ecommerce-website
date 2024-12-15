import React from "react"; //to create the component
import { Link } from "react-router-dom"; //to create a navigable link
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import "../styles/ProductCard.css"; //for styling the component

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const defaultImage =
    "https://dummyimage.com/300x300/ccc/000.jpg&text=No+Image";

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addItemToCart(product));
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product?.id}`} className="product-card-link">
        <div className="product-card-img-container">
          <img
            className="product-card-img" //uses the first image in the product.images array for the src attribute
            src={product.thumbnail || defaultImage} //sets the alt attribute to the product title
            alt={product.title} //assigns a class name of product-card-img for styling
          />
        </div>
        <div className="product-card-body">
          <div className="product-card-title">{product.title}</div>
          <p className="product-card-text">
            Rating: {product.rating} ({product?.reviews?.length || 0} reviews)
          </p>
          <p className="product-card-text">Price: ${product.price}</p>
          <div className="product-card-button">
            {/* sets the to attribute to a dynamic url using the product id (`/product/${product.id}`) */}
            View Details
          </div>
        </div>
      </Link>
      {/* <button onClick={handleAddToCart} className="add-to-cart-button">
        {" "}
        Add To Cart
      </button> */}
    </div>
  );
};
export default ProductCard;
