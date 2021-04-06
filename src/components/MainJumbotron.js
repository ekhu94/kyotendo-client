import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import jumboImg from '../assets/jumbo.jpg';

const MainJumbotron = () => {
    return (
        <Jumbotron fluid style={{
                backgroundImage: 'url(' + jumboImg + ')',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                height: '600px',
                opacity: '0.95'
            }}>
            <Container>
                {/* <img src={jumboImg} /> */}
            </Container>
        </Jumbotron>
    );
};

export default MainJumbotron;