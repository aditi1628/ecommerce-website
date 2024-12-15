import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Navbar.css";

const Navbar = () => {
  const logoImageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfdpOie4ezYfWx_Dpay5hg2aWoCXaWSIVrGQ&usqp=CAU";

  const totalCount = useSelector((state) => state.cart.totalCount);

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logoImageUrl} alt="Logo" className="logo-img" />
        </Link>
        <div className="navbar-center">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/about-us" className="navbar-link">
            About Us
          </Link>
          <Link to="/contact-us" className="navbar-link">
            Contact Us
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        {/* <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search products"
          className="navbar-search-input"
        />
        <button onClick={handleSearch} className="navbar-search-button">
          Search
        </button> */}
        <Link to="/cart" className="navbar-link" style={{ marginLeft: "auto" }}>
          Cart Items ({totalCount})
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
