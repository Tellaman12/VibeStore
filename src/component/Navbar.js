import React from "react";
import { Link } from "react-router-dom";
import'./Navbar.css';

const Navbar = () => {
  return (
    <nav className="Nabb">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/shop">Shop</Link>
    
    </nav>
  );
};

export default Navbar;
