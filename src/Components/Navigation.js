import React from 'react';
import logo from './../logo.png';
import './../App.css';
import './../css/shortcode/header.css';
import "./../css/shortcode/default.css";
import * as routes from './../constants/routes';
import { Link } from 'react-router-dom';
import SignOutButton from './Signout';

import { Image, Menu, Label } from 'semantic-ui-react';

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
    <Menu style={{ backgroundColor: "#f1f1f1" }}>
        <Menu.Item href="/">
            <Image src={logo} className="App-logo" alt="logo" style={{ resizeMode: "cover" }} />
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item className="menu-items" name='Télécharger' href="/#download" />
            <Menu.Item className="menu-items" name='Projet' href="/#project" />
            <Menu.Item className="menu-items" name='Caractéristiques' href="/#features" />
            <Menu.Item className="menu-items" name='Infos légales' href="/#personnal" />
            <Menu.Item className="menu-items" name='Mon espace' href="/Home" >
                <Label color='teal' size='huge'>Mon espace</Label>
            </Menu.Item>
            <Menu.Item>
                <SignOutButton />
            </Menu.Item>
        </Menu.Menu>
    </Menu>

const NavigationNonAuth = () =>
    <Menu style={{ backgroundColor: "#f1f1f1" }}>
        <Menu.Item href="/">
            <Image src={logo} className="App-logo" alt="logo" style={{ resizeMode: "cover" }} />
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item className="menu-items" name='Télécharger' href="/#download" />
            <Menu.Item className="menu-items" name='Projet' href="/#project" />
            <Menu.Item className="menu-items" name='Caractéristiques' href="/#features" />
            <Menu.Item className="menu-items" name='Infos légales' href="/#personnal" />
            <Menu.Item>
                <div className="cap-readmore-5">
                    <Link to={routes.SIGN_IN} className="connect-btn">Se connecter</Link>
                </div>
            </Menu.Item>
        </Menu.Menu>
    </Menu>

export default Navigation;




/*
<Navbar color="faded" light expand="md" style={{ backgroundColor: "#f1f1f1" }}>
        <NavbarBrand href="/">
            <img src={logo} className="App-logo" alt="logo" />
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
            <NavItem style={{ marginTop: 4 }}>
                <NavLink href="#download" className="menu-items"> Télécharger </NavLink>
            </NavItem>
            <NavItem style={{ marginTop: 4 }}>
                <NavLink href="#project" className="menu-items"> Projet </NavLink>
            </NavItem>
            <NavItem style={{ marginTop: 4 }}>
                <NavLink href="#features" className="menu-items"> Caractéristiques </NavLink>
            </NavItem>
            <NavItem style={{ marginTop: 4, marginRight: 10 }}>
                <NavLink href="#personnal" className="menu-items"> Infos légales</NavLink>
            </NavItem>
            <NavItem>
            </NavItem>
        </Nav>
    </Navbar>
*/