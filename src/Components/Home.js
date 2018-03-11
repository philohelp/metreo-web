import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import withAuthorization from './withAuthorization';

import {
  NavItem,
  NavLink
} from 'reactstrap';
import * as routes from './../constants/routes';
import { Link } from 'react-router-dom';

const Home = () =>
  <div>
    <h1><p>The Home Page is accessible by every signed in user.</p></h1>
    <Link to={routes.ACCOUNT} className="menu-items" style={{ textDecoration: "none", color: "#333" }}>
      Paramètres
            </Link>
  </div>


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Home);