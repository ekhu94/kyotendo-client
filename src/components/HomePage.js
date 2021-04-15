import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { api } from '../services/api';
import './HomePage.css';
import { Row, Button } from 'react-bootstrap';
import GamesListCard from './GamesListCard';
import HomeCarousel from './HomeCarousel';
import PageLoader from './PageLoader';
import PostObject from './PostObject';
import { Link } from 'react-router-dom';


const HomePage = ({ posts, getHomePosts, games, getHomeGames }) => {
    const [gamesSample, setGamesSample] = useState([]);
    const [postsSample, setPostsSample] = useState([]);

    useEffect(() => {
        getHomeGames();
        getHomePosts();
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
                setGamesSample(list);
            }
        }
        getIndexes();
    }, [games]);

    useEffect(() => {
        if (posts && posts.length) {
            const idxs = [];
            for (let i = 0; i < 10; i++) {
                let idx = Math.floor(Math.random() * posts.length);
                if (!idxs.includes(idx)) {
                    idxs.push(idx);
                }
            }
            const list = [];
            for (let idx of idxs) {
                list.push(posts.find((g, i) => i === idx));
            }
            setPostsSample(list);
        }
    }, [posts]);

    const renderGameCards = () => {
        if (gamesSample && gamesSample.length) {
            return gamesSample.map((game, i) => {
                return <GamesListCard key={game.id} game={game} idx={i} imgUrl={game.background_image} />
            });
        }
    };

    const renderPosts = () => {
        if (postsSample && postsSample.length) {
            return postsSample.map(post => {
                return (
                    <Row className="justify-content-start ml-2" key={post.id}>
                        <PostObject post={post} pathname={`/forums/${post.forum.slug}`} />
                    </Row>
                );
            });
        }
    }

    return (
        <div className="pb-5">
            {gamesSample && gamesSample.length && postsSample && postsSample.length ?
            <>
                <HomeCarousel />
                <div id="home-title">
                    <h1 className="text-center my-0 pt-3 px-2 home-header d-block d-md-none">
                        Kyotendo
                    </h1>
                    <h3 className="text-center my-0 pt-1 pb-4 px-2 home-header d-block d-md-none">
                        Join the largest community of Nintendo fans on the web!
                    </h3>
                </div>
                <h2 className="text-start ml-4 mt-5 mb-4" style={{letterSpacing: '0.3rem'}}>Featured Games</h2>
                <div className="home-card-row">
                    {renderGameCards()}
                </div>
                <h2 className="text-start ml-4 mt-5 mb-1" style={{letterSpacing: '0.3rem'}}>Featured Posts</h2>
                {renderPosts()}
                <Link to="/forums">
                    <Button className="ml-2" variant="link" size="lg">
                        See more posts
                    </Button>
                </Link>
            </>
            : <PageLoader /> }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        games: state.games,
        posts: state.posts
    };
};

const { getHomeGames } = action.games;
const { getHomePosts } = action.posts;

export default connect(mapStateToProps, { getHomeGames, getHomePosts })(HomePage);