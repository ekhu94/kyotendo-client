import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Container, Row, Card, Button } from 'react-bootstrap';

import './YoutubeVideoPlayer.css';
import backgroundImg from '../assets/smash-bros-background.jpg';
import BackButton from './BackButton';
import NoVideosPage from './NoVideosPage';
import PageLoader from './PageLoader';
import YoutubeDetail from './YoutubeDetail';
import YoutubeSearch from './YoutubeSearch';
import YoutubeVideoList from './YoutubeVideoList';
//! custom hook
import useVideos from '../hooks/useVideos';

const YoutubeVideoPlayer = ({ gameSlug, gameShow, getGameShow, resetGameShow }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [quotaDone, setQuotaDone] = useState(false);
    const {videos, search} = useVideos(`${gameSlug} video game playthrough`);

    useEffect(() => {
        getGameShow(gameSlug);
        setTimeout(() => {
            if (!videos) {
                setQuotaDone(true);
            }
        }, 4000);

        return () => {
            resetGameShow();
        }
    }, []);

    useEffect(() => {
        setSelectedVideo(videos[0]);
    }, [videos]);

    const renderContent = () => {
        //! display loader, youtube content, or no-more-quota page to user
        if (quotaDone) {
            return <NoVideosPage gameSlug={gameSlug} gameShow={gameShow} />
        } else if (!quotaDone && !selectedVideo) {
            return <PageLoader />
        } else {
            return (
                <Container>
                    <BackButton label="back to game page" url={`/games/${gameSlug}`} />
                    <Row className="justify-content-center mt-2">
                        <Card style={{borderRadius: '20px'}} className="col-10 col-md-12 p-0">
                            <h1 className="youtube-header text-center py-4">{gameShow.name} Videos</h1>
                            <YoutubeSearch
                                gameSlug={gameSlug.split('-').join(' ')}
                                onSearchSubmit={search}
                            />
                            <Row className="justify-content-center mb-5">
                                <div className="col-11 col-lg-7">
                                    <YoutubeDetail
                                        video={selectedVideo}
                                    />
                                    <Row className="justify-content-center">
                                        <Button className="col-6 p-3 my-4 mb-lg-1 youtube-save-btn" variant="outline-success" size="md" block>
                                            Save To Collection
                                        </Button>
                                    </Row>
                                </div>
                                <div className="col-11 col-lg-4">
                                    <YoutubeVideoList
                                        videos={videos}
                                        onVideoSelect={setSelectedVideo}
                                    />
                                </div>
                            </Row>
                        </Card>
                    </Row>
                </Container>
            );
        }
    }

    return (
        <div
            className="py-5"
            id="video-container"
            style={{backgroundImage: `url(${backgroundImg})`}}
        >
            {renderContent()}
        </div>
    );
};

const mapStateToProps = state => {
    return { gameShow: state.gameShow }
};

const { getGameShow, resetGameShow } = action.games;

export default connect(mapStateToProps, { getGameShow, resetGameShow })(YoutubeVideoPlayer);