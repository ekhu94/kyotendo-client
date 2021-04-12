import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';

import { Container, Row, Button } from 'react-bootstrap';
import { api } from '../services/api';
import backgroundImg from '../assets/smash-bros-hd.jpg';
import './GamesList.css';
import GamesListCard from './GamesListCard';
import PageLoader from './PageLoader';
import ScrollTop from './ScrollTop';

const GamesList = ({ games, getGames, gamePage, setGamePage, resetGamePage }) => {
    const [loaded, setLoaded] = useState(false);
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        setGamePage();
        getGames();

        const handleScroll = () => {
            const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            const windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {          
                setTimeout(() => {
                    setGamePage();
                }, 1000);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            resetGamesList();
            resetGamePage();
            // setGamesList([])
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        console.log(games)
        if (games.length && gamePage > 0) {
            setLoaded(true);
        }
    }, [games]);

    // useEffect(() => {

        
    // }, [gamePage]);

    const renderGameCards = () => {
        if (games.length) {
            const filterGames = games.filter((g, i) => games.indexOf(g) === i);
            switch (sortBy) {
                case 'name':
                    return filterGames.sort((a, b) => a.slug > b.slug ? 1 : -1).slice(0, gamePage).map((game, i) => {
                        return (
                            <GamesListCard key={game.id} game={game} idx={i} />
                        );
                    });
                case 'date':
                    return filterGames.sort((a, b) => parseInt(b.released.split('-').join('')) - parseInt(a.released.split('-').join(''))).slice(0, gamePage).map((game, i) => {
                        return (
                            <GamesListCard key={game.id} game={game} idx={i} />
                        );
                    });
                default:
                    return null;
            }
        }
    };

    return (
        <div
            id="games-container"
            style={{backgroundImage: `url(${backgroundImg})`}}
        >
            {loaded ?
                <Container className="pb-5" style={{paddingTop: '100px'}}>
                    {/* <ScrollTop /> */}
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
    return {
        games: state.games,
        gamePage: state.gamePage
    };
};

const { getGames, resetGamesList, setGamePage, resetGamePage } = action.games;

export default connect(mapStateToProps, { getGames, resetGamesList, setGamePage, resetGamePage })(GamesList);