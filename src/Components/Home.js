import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  NavItem,
  NavLink
} from 'reactstrap';
import * as routes from './../constants/routes';
import { Link } from 'react-router-dom';

const Home = () =>
  <div>
    <Link to={routes.ACCOUNT} className="menu-items" style={{ textDecoration: "none", color: "#333" }}>
      Paramètres
            </Link>
  </div>

export default Home;