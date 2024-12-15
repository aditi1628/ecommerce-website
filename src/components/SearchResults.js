import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../redux/actions/productActions";
import ProductCard from "./ProductCard";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.products.searchResults);
  const { loading, error, results } = searchState || {};

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchSearchResults(searchTerm));
    }
  }, [dispatch, searchTerm]);

  // Ensure that results are an array before mapping
  const validResults = Array.isArray(results) ? results : [];

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchTerm}"</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : validResults.length > 0 ? (
        <div className="search-results">
          {validResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div>No results found.</div>
      )}
    </div>
  );
};

export default SearchResults;
