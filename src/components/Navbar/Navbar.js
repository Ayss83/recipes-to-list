import * as React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <Link to="/recipes" className="navbar-brand">
      <img className="logo" src="/images/logo.png" alt="logo" />
    </Link>
    <button className="navbar-toggler" data-toggle="collapse" data-target="#collapsedNav" aria-controls="collapsedNav" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
    <div className="collapse navbar-collapse" id="collapsedNav">
      <ul className="navbar-nav mr-auto ml-5">
        <li className="nav-item">
          <Link to="/recipes" className="nav-link">
            Recipes
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/shopping-list" className="nav-link">
            Shopping list
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
