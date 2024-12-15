import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/actions/productActions";
import "../styles/Home.css";

const filterDuplicateProducts = (products) => {
  const uniqueProducts = [];
  const productIds = new Set();

  products.forEach((product) => {
    if (!productIds.has(product.id)) {
      uniqueProducts.push(product);
      productIds.add(product.id);
    }
  });
  return uniqueProducts;
};

// const debounce = (func, delay) => {
//   let debounceTimer;
//   return function () {
//     clearTimeout(debounceTimer);
//     debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
//   };
// };

const Home = ({ searchTerm: initialSearchTerm = "" }) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);
  const { products, loading, error } = productState;
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleSearch = (searchQuery) => {
    setSearchTerm(searchQuery);
  };

  const filteredProducts = products?.filter((product) => {
    if (product && product.title) {
      return searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
    }
    return false;
  });

  const uniqueFilteredProducts = filterDuplicateProducts(filteredProducts);

  // Logging for debugging
  console.log("productState:", productState);
  console.log("filteredProducts:", filteredProducts);
  console.log("uniqueFilteredProducts:", uniqueFilteredProducts);
  console.log("searchTerm:", searchTerm);

  // const productIds = filteredProducts.map((product) => product.id);
  // console.log("Product IDs: ", productIds);

  // if (checkDuplicateIds(productIds)) {
  //   console.error("Duplicate IDs found: ", productIds);
  // } else {
  //   console.log("All IDs are unique.");
  // }

  return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : uniqueFilteredProducts?.length > 0 ? (
          uniqueFilteredProducts.map((product) => (
            <div className="col-md-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
