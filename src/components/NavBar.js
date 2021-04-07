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

    // const onDropdownClick = () => {
    //     setTimeout(() => {
    //         if (window.location.href !== `${URL}orders`) {
    //             orders.current.classList.remove('active')
    //         }
    //     }, 1)
        
    // };

    return (
        <Navbar collapseOnSelect ref={nav} variant="dark" expand="lg" fixed="top" className="nintendo-red py-3 align-items-center" style={{transition: 'all 0.2s'}}>
            <div className="container-fluid">
                <LinkContainer to="/" exact>
                    <Navbar.Brand id="nav-brand"><span className="japanese">共天堂</span> kyotendo</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/" exact>
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/games" exact>
                            <Nav.Link>Games</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/forums" exact>
                            <Nav.Link>Forums</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ms-auto">
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                        {localStorage.token && localStorage.token !== "undefined" ?
                            <>
                                <NavDropdown
                                    title={ userIconDropdown() }
                                    alignRight
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                        <NavDropdown.Item
                                            className=""
                                            onClick={()=>{
                                                onLogout()
                                            }}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        :
                            <>
                                <LinkContainer to="/auth">
                                    <Nav.Link><i className="fab fa-nintendo-switch pr-2" />Login/Signup</Nav.Link>
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