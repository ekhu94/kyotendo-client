import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './NavBar.css';
import AlertModal from './AlertModal';

const colorThemes = [
    {
        primary: 'var(--red-primary)',
        secondary: 'var(--red-secondary)',
        text: 'classic '
    },
    {
        primary: 'var(--blue-secondary)',
        secondary: 'var(--warning)',
        text: 'electric '
    },
    {
        primary: 'var(--lime)',
        secondary: 'var(--pink)',
        text: 'splash '
    },
    {
        primary: 'var(--blue-primary)',
        secondary: 'var(--tropical-green)',
        text: 'tropical '
    },
    {
        primary: 'var(--cyber-purple)',
        secondary: 'var(--cyber-orange)',
        text: 'cyber '
    }
];

const NavBar = ({ onLogout, auth, showAlert, renderAlert }) => {
    const [themeIdx, setThemeIdx] = useState(0);
    
    const nav = useRef();
    const navSub = useRef();

    const handleScroll = () => {
        if (nav && nav.current) {
            if (window.scrollY > 20) {
                nav.current.classList.remove('top', 'py-3')
                nav.current.classList.add('scrolled', 'py-1');
                navSub.current.classList.remove('sub-nav')
                navSub.current.classList.add('scrolled-sub')
            } else {
                nav.current.classList.remove('scrolled', 'py-1');
                nav.current.classList.add('top', 'py-3');
                navSub.current.classList.remove('scrolled-sub')
                navSub.current.classList.add('sub-nav')
            }
        }
    };

    const handleSetTheme = () => {
        setThemeIdx((themeIdx + 1) % 5);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const userIconDropdown = () => {
        return <><i className="fab fa-nintendo-switch mr-0" /> {auth.user.username}</>
    };

    const logoutMessages = {
        header: "Logout successful!",
        body: `See you again soon, ${auth.user.username}!`
    };

    return (
        <div className="fixed-top">
        {/* primary navbar */}
        <Navbar collapseOnSelect ref={nav} variant="dark" expand="md" className="py-3 align-items-center" style={{backgroundColor: `${ colorThemes[themeIdx].primary }`, transition: 'all 0.3s'}}>
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
                        <Nav.Link onClick={handleSetTheme} active={false}>
                            <span style={{fontSize: '1rem'}}>
                                {colorThemes[themeIdx].text}
                                {themeIdx % 2 === 0 ? <i className="fas fa-fill" /> : <i className="fas fa-fill-drip" />}
                            </span>
                        </Nav.Link>
                        {localStorage.token && localStorage.token !== "undefined" ?
                            <>
                                <NavDropdown
                                    title={ userIconDropdown() }
                                    alignRight
                                >
                                    <LinkContainer to={`/users/${auth.user.id}`}>
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
        {/* secondary navbar */}
        <Navbar ref={navSub} className="sub-nav" style={{transition: 'all 0.3s', opacity: '0.9', backgroundColor: `${colorThemes[themeIdx].secondary}`}}>
        </Navbar>
        {/* <AlertModal showModal={showModal} setShowModal={setShowModal} messages={logoutMessages} /> */}
        </div>
    );
};

const mapStateToProps = state => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(NavBar);