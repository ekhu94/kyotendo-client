import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { api } from '../services/api';
import { Container, Row, Card, Button, Alert } from 'react-bootstrap';

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

const YoutubeVideoPlayer = ({ auth, gameSlug, gameShow, getGameShow, resetGameShow }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [quotaDone, setQuotaDone] = useState(false);
    const [saveAlert, setSaveAlert] = useState(false);
    const {videos, search} = useVideos(`${gameSlug} video game playthrough`);

    const saveBtn = useRef();

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

    useEffect(() => {
        const checkBackendVideos = async () => {
            const backendVideos = await api.rails.get('/videos');
            if (backendVideos.data && selectedVideo) {
                const findVideo = backendVideos.data.find(v => v.title === selectedVideo.snippet.title);
                console.log(findVideo)
                if (findVideo && findVideo.user_id === auth.user.id) {
                    saveBtn.current.setAttribute('disabled', true);
                    saveBtn.current.classList.add('disabled-btn');
                    saveBtn.current.classList.remove('youtube-save-btn');
                    saveBtn.current.innerText = 'Already Saved'
                } else {
                    saveBtn.current.removeAttribute('disabled');
                    saveBtn.current.classList.remove('disabled-btn');
                    saveBtn.current.classList.add('youtube-save-btn');
                    saveBtn.current.innerText = 'Save To Collection'
                }
            }
        }
        checkBackendVideos();
    }, [selectedVideo]);

    useEffect(() => {
        if (saveAlert) {
            setTimeout(() => {
                setSaveAlert(false);
            }, 3000);
        }
    }, [saveAlert])

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
                                        className="mb-4"
                                    />
                                    {auth.user && auth.user.id ?
                                        <Row className="justify-content-center">
                                            <Button
                                                ref={saveBtn}
                                                className="col-6 p-3 mt-3 mb-lg-1 youtube-save-btn" variant="outline-success"
                                                size="md"
                                                block
                                                onClick={onSaveClick}
                                            >
                                                Save To Collection
                                            </Button>
                                        </Row>
                                    : null }
                                    <Row className="justify-content-center">
                                        {saveAlert ?
                                            <Alert className="col-11 mt-3" variant="info">
                                                Video successfully saved!
                                            </Alert>
                                        : null }
                                    </Row>
                                </div>
                                <div className="col-11 col-lg-4 mt-3 mt-lg-0">
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

    const onSaveClick = () => {
        if (auth.user && gameShow && selectedVideo) {
            const saveNewGameAndVideo = async () => {
                const backendGames = await api.rails.get(`/games`);
                if (backendGames.data) {
                    const findGame = backendGames.data.find(g => g.name === gameShow.name);
                    let gameId;
                    if (!findGame) {
                        const newGame = {
                            name: gameShow.name,
                            rating: gameShow.metacritic,
                            img_url: gameShow.background_image,
                            release_date: gameShow.released
                        };
                        const res1 = await api.game.saveGame(newGame);
                        gameId = res1.data.id;
                    } else {
                        gameId = findGame.id;
                    }
                    const newVideo = {
                        title: selectedVideo.snippet.title,
                        description: selectedVideo.snippet.description,
                        video_url: `https://www.youtube.com/embed/${selectedVideo.id.videoId}`,
                        thumbnail: selectedVideo.snippet.thumbnails.high.url,
                        user_id: auth.user.id,
                        game_id: gameId
                    };
                    const res2 = await api.video.saveVideo(newVideo);
                    setSaveAlert(true);
                }
            }
            saveNewGameAndVideo();
        }
    };

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
    return { auth: state.auth, gameShow: state.gameShow }
};

const { getGameShow, resetGameShow } = action.games;

export default connect(mapStateToProps, { getGameShow, resetGameShow })(YoutubeVideoPlayer);