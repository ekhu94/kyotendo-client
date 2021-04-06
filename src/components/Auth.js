import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Auth = () => {
    return (
        <Container className="pt-2">
            <Row className="justify-content-center">
                <h1 className="my-5">Kyotendo Accounts</h1>
            </Row>
            <Row className="justify-content-center">
                <Card className="text-center col-10 col-md-8 col-lg-6 p-0" style={{borderRadius: '16px'}}>
                    <Card.Body>
                        <Card.Title className="mt-3 mb-4" style={{fontSize: '1.6em'}}>Join our online community!</Card.Title>
                        <Card.Text className="mb-4">
                        Sign into an existing account or create a new one!
                        </Card.Text>
                        <Container fluid>
                            <Row className="justify-content-center pb-4">
                                <Link to="/login" className="col-8 col-md-5">
                                    <Button block variant="primary" className="my-3 my-md-0 px-5 py-2" style={{borderRadius: '18px'}}>Login</Button>
                                </Link>
                                <Link to="/signup" className="col-8 col-md-5">
                                    <Button block variant="primary" className="mt-3 my-md-0 px-5 py-2" style={{borderRadius: '18px'}}>Sign Up</Button>
                                </Link>
                            </Row>
                        </Container>
                    </Card.Body>
                    <Card.Footer className="text-muted">Signing up is free and easy!</Card.Footer>
                </Card>
            </Row>
        </Container>
    );
};

export default Auth;