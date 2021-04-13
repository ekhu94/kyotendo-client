import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Card, Row, Table, Button } from 'react-bootstrap';
import { Image } from 'semantic-ui-react';
import './GameShow.css'; 
import backgroundImg from '../assets/smash-bros-background.jpg';
import BackButton from './BackButton';
import GameVideo from './GameVideo';
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

    const renderPlatforms = () => {
        if (gameShow.platforms && gameShow.platforms.length) {
            const platforms = gameShow.platforms.filter(p => !p.platform.name.includes('PlayStation') && !p.platform.name.includes('Xbox')).map(p => p.platform.name);
            return platforms.join(', ');
        }
    };

    const renderGenres = () => {
        if (gameShow.genres) {
            const genres = gameShow.genres.map(g => g.name);
            return genres.join(', ');
        }
    };

    const renderTags = () => {
        if (gameShow.tags) {
            const tags = gameShow.tags.filter(t => t.language === "eng").slice(0, 3).map(t => t.name);
            return tags.join(', ');
        }
    }

    const formatDate = release => {
        if (release) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const date = release.split('-');
            const year = date[0];
            const month = monthNames[parseInt(date[1]) - 1];
            const day = date[2];
            return `${month} ${day}, ${year}`;
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
                            {gameShow ?
                            <div className="my-5">
                                <h3 className="text-center mb-4">Game Information</h3>
                                <Table striped hover>
                                    <tbody>
                                        <tr style={{fontWeight: 'bold', letterSpacing: '0.1rem'}}>
                                            <td colSpan="2" className="pl-2 pl-sm-3 pl-md-4 pl-lg-5">Release Date</td>
                                            <td className="text-center" colSpan="2">{formatDate(gameShow.released)}</td>
                                        </tr>
                                        <tr style={{fontWeight: 'bold', letterSpacing: '0.1rem'}}>
                                            <td colSpan="2" className="pl-2 pl-sm-3 pl-md-4 pl-lg-5">Platform</td>
                                            <td className="text-center" colSpan="2">{renderPlatforms()}</td>
                                        </tr>
                                        <tr style={{fontWeight: 'bold', letterSpacing: '0.1rem'}}>
                                            <td colSpan="2" className="pl-2 pl-sm-3 pl-md-4 pl-lg-5">Metacritic Score</td>
                                            <td className="text-center" colSpan="2">{gameShow.metacritic}</td>
                                        </tr>
                                        <tr style={{fontWeight: 'bold', letterSpacing: '0.1rem'}}>
                                            <td colSpan="2" className="pl-2 pl-sm-3 pl-md-4 pl-lg-5">Genres</td>
                                            <td className="text-center" colSpan="2">{renderGenres()}</td>
                                        </tr>
                                        {gameShow.esrb_rating ?
                                            <tr style={{fontWeight: 'bold', letterSpacing: '0.1rem'}}>
                                                <td colSpan="2" className="pl-2 pl-sm-3 pl-md-4 pl-lg-5">ESRB Rating</td>
                                                <td className="text-center" colSpan="2">{gameShow.esrb_rating.name}</td>
                                            </tr>
                                        : null }
                                        <tr style={{fontWeight: 'bold', letterSpacing: '0.1rem'}}>
                                            <td colSpan="2" className="pl-2 pl-sm-3 pl-md-4 pl-lg-5">Tags</td>
                                            <td className="text-center" colSpan="2">{renderTags()}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            : null }
                            {gameShow.clip ?
                                <Row className="justify-content-center mb-5">
                                    <div className="col-10">
                                        <GameVideo video={gameShow.clip.clips.full} />
                                    </div>
                                </Row>
                            : null }
                            {gameShow.ratings.length ?
                                <div>
                                    <h3 className="text-center mb-2">Player Ratings</h3>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr className="text-center">
                                                <th>Count</th>
                                                <th>Skip</th>
                                                <th>Meh</th>
                                                <th>Recommended</th>
                                                <th>Exceptional</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-center">
                                                <td>{gameShow.reviews_count}</td>
                                                {gameShow.ratings.length >= 4 ?
                                                    <td>{gameShow.ratings[3].percent}%</td>
                                                : <td>0%</td> }
                                                {gameShow.ratings.length >= 3 ?
                                                    <td>{gameShow.ratings[2].percent}%</td>
                                                : <td>0%</td> }
                                                {gameShow.ratings.length >= 1 ?
                                                    <td>{gameShow.ratings[0].percent}%</td>
                                                : <td>0%</td> }
                                                {gameShow.ratings.length >= 2 ?
                                                    <td>{gameShow.ratings[1].percent}%</td>
                                                : <td>0%</td> }
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            : null }
                            <Row className="justify-content-center my-5">
                                <Link className="col-8 col-md-6" to={`/games/${gameShow.slug}/videos`}>
                                    <Button className="p-3 youtube-link-btn" variant="primary" size="lg" block>
                                        Videos for {gameShow.name}
                                    </Button>
                                </Link>
                            </Row>
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