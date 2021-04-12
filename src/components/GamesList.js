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
    const [gamesList, setGamesList] = useState([]);

    useEffect(() => {    
        getGames(gamePage);

        const handleScroll = () => {
            const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            const windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {    
                console.log('bottom reached')       
                setTimeout(() => {
                    setLoaded(false);
                    setGamePage();
                    console.log(`now on page ${gamePage}`)
                }, 1000);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            resetGamePage();
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (!gamesList.length) setGamesList(games);
        if (gamesList.length && !loaded) {
            setLoaded(true);
        }
    }, [games]);

    useEffect(() => {
        getGames(gamePage)
        console.log('games: ', games)
        if (games.length) {
            setGamesList([...gamesList, ...games])
            setLoaded(true)
        }
    }, [gamePage]);

    const renderGameCards = () => {
        if (loaded) {
            return gamesList.filter((g, i) => gamesList.indexOf(g) === i).map((game, i) => {
                return (
                    <GamesListCard key={game.id} game={game} idx={i} />
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
                <Container className="pb-5" style={{paddingTop: '100px'}}>
                    <Row className="justify-content-center">
                        <div className="col-10">
                            <h1 className="mb-5 p-2 text-center games-list-header">Nintendo Games List</h1>
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        {renderGameCards()}
                    </Row>
                </Container>
            : <PageLoader /> }
        </div>
    );
};

const mapStateToProps = state => {
    console.log(state.games)
    return {
        games: state.games,
        gamePage: state.gamePage
    };
};

const { getGames, setGamePage, resetGamePage } = action.games;

export default connect(mapStateToProps, { getGames, setGamePage, resetGamePage })(GamesList);