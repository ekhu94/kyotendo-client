import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { api } from '../services/api';
import './HomePage.css';
import GamesListCard from './GamesListCard';
import HomeCarousel from './HomeCarousel';


const HomePage = ({ games, getHomeGames }) => {
    const [gamesSample, setGamesSample] = useState([]);

    useEffect(() => {
        getHomeGames();
    }, []);

    useEffect(() => {
        const getIndexes = () => {
            if (games && games.length) {
                const idxs = [];
                for (let i = 0; i < 10; i++) {
                    let idx = Math.floor(Math.random() * games.length);
                    if (!idxs.includes(idx)) {
                        idxs.push(idx);
                    }
                }
                const list = [];
                for (let idx of idxs) {
                    list.push(games.find((g, i) => i === idx));
                }
                console.log(list)
                setGamesSample(list);
            }
        }
        getIndexes();
    }, [games]);

    const renderGameCards = () => {
        if (gamesSample && gamesSample.length) {
            return gamesSample.map((game, i) => {
                return <GamesListCard key={game.id} game={game} idx={i} imgUrl={game.background_image} />
            });
        }
    };

    return (
        <div>
            <HomeCarousel />
            <h3 className="text-center my-3" style={{letterSpacing: '0.3rem'}}>Featured Games</h3>
            <div className="home-card-row">
                {renderGameCards()}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        games: state.games
    };
};

const { getHomeGames } = action.games;

export default connect(mapStateToProps, { getHomeGames })(HomePage);