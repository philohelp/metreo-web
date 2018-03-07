import React, { Component } from 'react';
import logo from './../logo.png';
import './../App.css';
import './../css/shortcode/header.css';
import "./../css/shortcode/default.css";
import * as routes from './../constants/routes';
import { Link } from 'react-router-dom';
import SignOutButton from './Signout';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import PropTypes from 'prop-types';

const Navigation = (props, { authUser }) =>
    <div>
        {authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>

Navigation.contextTypes = {
    authUser: PropTypes.object,
};

const NavigationAuth = () =>
    <Navbar color="faded" light expand="md" style={{ backgroundColor: "#f1f1f1" }}>
        <NavbarBrand href="/">
            <img src={logo} className="App-logo" alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Nav className="ml-auto" navbar>
            <NavItem style={{ marginTop: 2 }}>
                <NavLink href="#download" className="menu-items"> Elèves </NavLink>
            </NavItem>
            <NavItem style={{ marginTop: 2 }}>
                <NavLink href="#project" className="menu-items"> Copies </NavLink>
            </NavItem>
            <NavItem style={{ marginTop: 2 }}>
                <NavLink href="#features" className="menu-items"> Paquets </NavLink>
            </NavItem>
            <SignOutButton />
        </Nav>
    </Navbar >

const NavigationNonAuth = () =>
    <Navbar color="faded" light expand="md" style={{ backgroundColor: "#f1f1f1" }}>
        <NavbarBrand href="/">
            <img src={logo} className="App-logo" alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Nav className="ml-auto" navbar>
            <NavItem style={{ marginTop: 2 }}>
                <NavLink href="#download" className="menu-items"> Télécharger </NavLink>
            </NavItem>
            <NavItem style={{ marginTop: 2 }}>
                <NavLink href="#project" className="menu-items"> Projet </NavLink>
            </NavItem>
            <NavItem style={{ marginTop: 2 }}>
                <NavLink href="#features" className="menu-items"> Caractéristiques </NavLink>
            </NavItem>
            <NavItem style={{ marginTop: 2, marginRight: 10 }}>
                <NavLink href="#personnal" className="menu-items"> Infos légales</NavLink>
            </NavItem>
            <NavItem>
                <div className="cap-readmore-5">
                    <Link to={routes.SIGN_IN} className="connect-btn">Se connecter</Link>
                </div>
            </NavItem>
        </Nav>
    </Navbar>

export default Navigation;