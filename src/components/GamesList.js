import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';

import { Container, Row, Card } from 'react-bootstrap';
import { api } from '../services/api';
import backgroundImg from '../assets/smash-bros-hd.jpg';
import './GamesList.css';

const GamesList = ({ games, getGames }) => {
    const [gamePage, setGamePage] = useState(1);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getGames(gamePage);

        return () => {
            setGamePage(1);
        }
    }, []);

    useEffect(() => {
        setLoaded(true);
    }, [games]);

    return (
        <div
            id="games-container"
            style={{backgroundImage: `url(${backgroundImg})`}}
        >
            <Container className="pt-5">
                <Row className="justify-content-center">

                </Row>
            </Container>
        </div>
    );
};

const mapStateToProps = state => {
    console.log(state)
    return {
        games: state.games
    };
};

const { getGames } = action.games;

export default connect(mapStateToProps, { getGames })(GamesList);