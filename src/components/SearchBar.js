import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SearchBar.css";

const SearchBar = () => {
  //defines the search bar component which takes onSearch as a prop, onSearch is a function that will be called when search is performed
  const [query, setQuery] = useState(""); //uses useState hook to create a state variable query and a function setQuery to update it, the initial state of query is an empty string
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    //this function handleInputChange is called whenever the input field value changes, it updates the query state with the new value from the input field
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    //this function handleSearch is called when the search button is clicked, it calls the onSearch function passed as a prop with the current query value
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products/search?q=${query.trim()}`);
    }
  };

  return (
    <form className="search-bar-container" onSubmit={handleSearch}>
      <span className="fa fa-search"></span>
      <input
        type="text"
        className="search-input"
        placeholder="Search for products"
        value={query} //sets the input value to the current query state
        onChange={handleInputChange} //specifies that handleInputChange should be called whenever the input value changes
      />

      <button
        className="search-button"
        type="submit" //specifies that handleSearch should be called when the button is clicked
      >
        Search
      </button>
    </form>
  );
};
export default SearchBar;
