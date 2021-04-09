import React, { useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './NavBar.css';

const NavBar = ({ onLogout, auth }) => {
    // const URL = 'https://fros-store.herokuapp.com/'  
    const nav = useRef();
    // const account = useRef();
    const navGames = useRef();
    const navForums = useRef();
    const navSwitch = useRef();
    const navAuth = useRef();

    const removeActives = () => {
        
        let filepath = window.location.pathname;
        let checkGames = navGames.current;
        let checkForums = navForums.current;
        let checkSwitch = navSwitch.current;
        let checkAuth = navAuth.current;
        if (checkGames && filepath !== `/${checkGames.innerText}`) {
            console.log('not in games route')
            navGames.current.classList.remove('active');
        }
        if (checkForums && filepath !== `/${checkForums.innerText}`) {
            console.log('not in forums route')
            navForums.current.classList.remove('active');
        }
        if (checkSwitch) {
            navSwitch.current.classList.remove('active');
        }
        if (checkAuth && filepath !== `/${checkAuth.innerText}`) {
            navAuth.current.classList.remove('active');
        }
    }

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
        <Navbar collapseOnSelect ref={nav} variant="dark" expand="md" fixed="top" className="py-3 align-items-center" style={{backgroundColor: 'var(--red-secondary)', transition: 'all 0.3s'}}>
            <div className="container-fluid">
                <LinkContainer to="/" exact>
                    <Navbar.Brand id="nav-brand"><span className="japanese">共天堂</span> kyotendo</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/games" exact>
                            <Nav.Link active={false}>games</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/forums" exact>
                            <Nav.Link active={false}>forums</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ms-auto">
                        <LinkContainer to="/about">
                            <Nav.Link active={false}>about</Nav.Link>
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
                                    <Nav.Link active={false}><i className="fab fa-nintendo-switch pr-2" />login/signup</Nav.Link>
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