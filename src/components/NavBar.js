import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './NavBar.css';

const NavBar = ({ onLogout, auth }) => {
    // const URL = 'https://fros-store.herokuapp.com/'  
    const nav = useRef();
    // const account = useRef();

    const handleScroll = () => {
        if (window.scrollY > 20) {
        nav.current.classList.remove('top', 'py-3')
        nav.current.classList.add('scrolled', 'py-1');
        } else {
        nav.current.classList.remove('scrolled', 'py-1');
        nav.current.classList.add('top', 'py-3');
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const userIconDropdown = () => {
        return <><i className="fab fa-nintendo-switch mr-0" /> {auth.user.username}</>
    };

    return (
        <Navbar collapseOnSelect ref={nav} variant="dark" expand="md" fixed="top" className="nintendo-red py-3 align-items-center" style={{transition: 'all 0.2s'}}>
            <div className="container-fluid">
                <LinkContainer to="/" exact>
                    <Navbar.Brand id="nav-brand"><span className="japanese">共天堂</span> kyotendo</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/games" exact>
                            <Nav.Link>games</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/forums" exact>
                            <Nav.Link>forums</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ms-auto">
                        <LinkContainer to="/about">
                            <Nav.Link>about</Nav.Link>
                        </LinkContainer>
                        {localStorage.token && localStorage.token !== "undefined" ?
                            <>
                                <NavDropdown
                                    title={ userIconDropdown() }
                                    alignRight
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>profile</NavDropdown.Item>
                                    </LinkContainer>
                                        <NavDropdown.Item
                                            className=""
                                            onClick={()=>{
                                                onLogout()
                                            }}
                                        >
                                            logout
                                        </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        :
                            <>
                                <LinkContainer to="/auth">
                                    <Nav.Link><i className="fab fa-nintendo-switch pr-2" />login/signup</Nav.Link>
                                </LinkContainer>
                            </>
                    }
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

const mapStateToProps = state => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(NavBar);