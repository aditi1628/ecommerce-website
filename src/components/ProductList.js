import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/actions/productActions";
import "../styles/ProductList.css";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);
  const { products, loading, error } = productState;

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="product-list-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default ProductList;
