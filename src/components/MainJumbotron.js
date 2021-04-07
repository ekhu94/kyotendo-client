import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import jumboImg from '../assets/jumbo.jpg';
import './MainJumbotron.css';

const MainJumbotron = () => {
    return (
        <Jumbotron fluid style={{backgroundImage: 'url(' + jumboImg + ')'}}>
            <Container>
                <Row className="justify-content-center justify-content-md-end">
                    <h1 className="text-white mt-5 align-content-end">WHAT ARE YOU PLAYING?</h1>
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default MainJumbotron;