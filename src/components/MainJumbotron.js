import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import jumboImg from '../assets/jumbo.jpg';
import './MainJumbotron.css';

const MainJumbotron = () => {
    return (
        <Jumbotron fluid style={{backgroundImage: 'url(' + jumboImg + ')'}}>
            <Container>
                <Row className="align-items-center justify-content-end">
                    <h1 className="text-white">What are you playing?</h1>
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default MainJumbotron;