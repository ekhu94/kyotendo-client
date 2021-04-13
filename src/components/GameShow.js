import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';

import { Jumbotron, Container, Card, Row, Table } from 'react-bootstrap';
import { Image } from 'semantic-ui-react';
import './GameShow.css'; 
import backgroundImg from '../assets/smash-bros-background.jpg';
import BackButton from './BackButton';
import PageLoader from './PageLoader';

const GameShow = ({ gameShow, getGameShow, resetGameShow, gameSlug }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getGameShow(gameSlug)

        return () => {
            resetGameShow();
        }
    }, []);

    useEffect(() => {
        if (gameShow && gameShow.id) {
            setLoaded(true);
        }     
    }, [gameShow]);

    const renderImages = () => {
        if (gameShow.short_screenshots && gameShow.short_screenshots.length) {
            return gameShow.short_screenshots.map((img, i) => {
                if (gameShow.short_screenshots.indexOf(img) !== 0) {
                    return (
                        <div key={img.id} className="col-10 col-md-5 my-3 mx-2">
                            <Image alt={img.id} src={img.image} rounded className="screenshot-img" />
                        </div>
                    );
                }
            });
        }
    };

    return (
        <div>
            {loaded ?
            <div
                className="pt-5"
                id="game-show-container"
                style={{backgroundImage: `url(${backgroundImg})`}}
            >
                <BackButton label="back to all games" />
                <Jumbotron className="game-show-jumbo mb-0" fluid style={{backgroundImage: `url(${gameShow.background_image})`}}>
                    <Container>
                    </Container>
                </Jumbotron>
                <Container>
                    <Row className="justify-content-center mt-5">
                        <Card className="col-10 col-md-12 p-0 mb-5" style={{borderRadius: '20px'}}>
                            <h1 className="py-4 px-2 mb-0 game-show-header text-center">{gameShow.name}</h1>
                            <Row className="justify-content-center my-5">
                                {renderImages()}
                            </Row>
                            {gameShow.ratings.length ?
                                <Table striped bordered hover>
                                    <thead>
                                        <tr className="text-center">
                                            <th>Count</th>
                                            <th>Meh</th>
                                            <th>Recommended</th>
                                            <th>Exceptional</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td>{gameShow.reviews_count}</td>
                                            <td>{gameShow.ratings[2].percent}%</td>
                                            <td>{gameShow.ratings[0].percent}%</td>
                                            <td>{gameShow.ratings[1].percent}%</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            : null }
                        </Card>
                    </Row>
                </Container>
            </div>
            : <PageLoader /> }
        </div>
    );
};

const mapStateToProps = state => {
    console.log(state.gameShow)
    return { gameShow: state.gameShow };
};

const { getGameShow, resetGameShow } = action.games;

export default connect(mapStateToProps, { getGameShow, resetGameShow })(GameShow);