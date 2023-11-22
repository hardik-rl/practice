import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container flex-container">
        <div>
          <h3>Brand Logo</h3>
        </div>
        <ul>
          <li>
            <Link to={"/product"}>Product </Link>
          </li>
          <li>
            <Link to={"/users"}>Users </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;