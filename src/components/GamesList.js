import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';

import { Container, Row, Button, Card } from 'react-bootstrap';
import { Input } from 'semantic-ui-react';
import { api } from '../services/api';
import backgroundImg from '../assets/smash-bros-hd.jpg';
import './GamesList.css';
import GamesListCard from './GamesListCard';
import GamesSortButtons from './GamesSortButtons';
import PageLoader from './PageLoader';
import ScrollTop from './ScrollTop';

const GamesList = ({ games, getGames, gamePage, setGamePage, resetGamePage }) => {
    const [loaded, setLoaded] = useState(false);
    const [sortBy, setSortBy] = useState('new');
    const [displayGames, setDisplayGames] = useState([]);
    const [term, setTerm] = useState('');

    useEffect(() => {

        if (gamePage > games.length + 20) {
            resetGamePage();
        }
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
            // resetGamesList();
            // setGamesList([])
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if (games.length && gamePage > 0) {
            setDisplayGames(games);
            setLoaded(true);
        }
    }, [games]);

    useEffect(() => {
        const search = setTimeout(() => {
            if (term === '') {
                setDisplayGames(games);
            } else {
                const query = games.filter(g => g.slug.split('-').join(' ').toLowerCase().includes(term.toLowerCase()));
                setDisplayGames(query);
            }
        }, 500);

        return () => {
            clearInterval(search);
        }
        
    }, [term]);

    const renderGameCards = () => {
        if (displayGames.length) {
            switch (sortBy) {
                case 'title':
                    return displayGames.sort((a, b) => a.slug > b.slug ? 1 : -1).slice(0, gamePage).map((game, i) => {
                        return (
                            <GamesListCard key={game.id} game={game} idx={i} imgUrl={game.background_image} />
                        );
                    });
                case 'new':
                    return displayGames.sort((a, b) => parseInt(b.released.split('-').join('')) - parseInt(a.released.split('-').join(''))).slice(0, gamePage).map((game, i) => {
                        return (
                            <GamesListCard key={game.id} game={game} idx={i} imgUrl={game.background_image} />
                        );
                    });
                case 'rating':
                    return displayGames.sort((a, b) => b.metacritic - a.metacritic).slice(0, gamePage).map((game, i) => {
                        return (
                            <GamesListCard key={game.id} game={game} idx={i} imgUrl={game.background_image} />
                        );
                    });
                default:
                    return null;
            }
        }
    };

    const onSortClick = sort => {
        setSortBy(sort);
    }

    return (
        <div
            id="games-container"
            style={{backgroundImage: `url(${backgroundImg})`}}
        >
            {loaded ?
                <Container className="pb-5" style={{paddingTop: '100px'}}>
                    {/* <ScrollTop /> */}
                    <Row className="justify-content-center">
                    <Card className="p-0 games-header-card col-10 mb-3">
                        <h1 className="mb-3 p-4 text-center games-list-header">Nintendo Games List</h1>
                        <Row className="justify-content-center my-3">
                            <Input className="col-10 col-md-11" placeholder="Game search..." size="large" type="text" value={term} onChange={e => setTerm(e.target.value)} />
                        </Row>                
                        <h3 className="text-center mb-3">sort by <span style={{color: 'var(--blue-primary)'}}>{sortBy}</span></h3>
                        <Row className="justify-content-center">
                            <GamesSortButtons onSortClick={onSortClick} />
                        </Row>
                    </Card>
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