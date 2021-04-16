import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Card, Button } from 'react-bootstrap';

import './Auth.css';
import backgroundImg from '../assets/smash-bros-background.jpg';

const Auth = () => {
    return (
        <div className="auth-page-container" style={{backgroundImage: `url(${backgroundImg})`}}>
            <Container>
                <Row className="justify-content-center">
                    <Card className="text-center col-10 col-md-8 p-0" style={{borderRadius: '20px'}}>
                        <h1 className="auth-header py-4">Kyotendo Accounts</h1>
                        <Card.Body>
                            <Card.Title className="pt-4 pb-4" style={{fontSize: '1.6em'}}>Join our online community!</Card.Title>
                            <Container fluid>
                                <Row className="justify-content-center pb-5">
                                    <Link to="/login" className="login-link col-10 col-sm-7 col-md-6 col-lg-4">
                                        <Button block variant="primary" className="my-3 my-md-0 px-5 py-3" style={{borderRadius: '18px', fontSize: '1rem', letterSpacing: '0.1rem'}}>Login</Button>
                                    </Link>
                                    <Link to="/signup" className=" signup-link col-10 col-sm-7 col-md-6 col-lg-4">
                                        <Button block variant="primary" className="mt-3 my-md-0 px-5 py-3" style={{borderRadius: '18px', fontSize: '1rem', letterSpacing: '0.1rem'}}>Sign Up</Button>
                                    </Link>
                                </Row>
                            </Container>
                        </Card.Body>
                        <Card.Footer style={{borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', backgroundColor: 'var(--blue-secondary)', color: '#fff', letterSpacing: '0.1rem'}} >Signing up is free and easy!</Card.Footer>
                    </Card>
                </Row>
            </Container>
        </div>
    );
};

export default Auth;