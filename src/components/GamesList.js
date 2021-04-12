import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';

import { Container, Row, Card } from 'react-bootstrap';
import { api } from '../services/api';
import backgroundImg from '../assets/smash-bros-hd.jpg';
import './GamesList.css';
import GamesListCard from './GamesListCard';
import PageLoader from './PageLoader';

const GamesList = ({ games, getGames, gamePage, setGamePage, resetGamePage }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getGames(gamePage);

        return () => {
            resetGamePage();
        }
    }, []);

    useEffect(() => {
        if (games.length) {
            setLoaded(true);
        }
    }, [games]);

    const renderGameCards = () => {
        if (loaded) {
            return games.map(game => {
                return (
                    <GamesListCard key={game.id} game={game} />
                );
            });
        }
    };

    return (
        <div
            id="games-container"
            style={{backgroundImage: `url(${backgroundImg})`}}
        >
            {loaded ?
                <Container className="py-5">
                    <Row className="justify-content-center">
                        {renderGameCards()}
                    </Row>
                </Container>
            : <PageLoader /> }
        </div>
    );
};

const mapStateToProps = state => {
    console.log(state)
    return {
        games: state.games,
        gamePage: state.gamePage
    };
};

const { getGames, setGamePage, resetGamePage } = action.games;

export default connect(mapStateToProps, { getGames, setGamePage, resetGamePage })(GamesList);