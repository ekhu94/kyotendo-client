import React from 'react';

import { Carousel } from 'react-bootstrap';
import './HomeCarousel.css';
import carousel1 from '../assets/carousel1.jpg';
import carousel2 from '../assets/carousel2.jpg';
import carousel3 from '../assets/carousel3.jpg';
import carousel4 from '../assets/carousel4.jpg';
import carousel5 from '../assets/carousel5.jpg';

const HomeCarousel = () => {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={carousel1}
                alt="First slide"
                />
                <Carousel.Caption>
                <h2 className="carousel-header d-none d-md-block pb-2">WATCH. PLAY. SHARE.</h2>
                {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={carousel2}
                alt="Second slide"
                />
            <Carousel.Caption>
                <h3 className="carousel-header d-none d-md-block">FIND YOUR GREATEST ADVENTURES</h3>
                <p className="carousel-subheader d-none d-md-block">Connect with Nintendo fans across the world!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={carousel3}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h2 className="carousel-header">Third slide label</h2>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={carousel4}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h2 className="carousel-header">Fourth slide label</h2>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={carousel5}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h2 className="carousel-header">Fifth slide label</h2>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default HomeCarousel;