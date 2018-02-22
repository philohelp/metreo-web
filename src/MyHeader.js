import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import './css/shortcode/header.css';
import "./css/shortcode/default.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

export default class MyHeader extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md" style={{ backgroundColor: "#f1f1f1" }}>
                    <NavbarBrand href="/">
                        <img src={logo} className="App-logo" alt="logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="#download" className="menu-items"> Télécharger </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#project" className="menu-items"> Projet </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#features" className="menu-items"> Caractéristiques </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#personnal" className="menu-items"> Infos légales</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}