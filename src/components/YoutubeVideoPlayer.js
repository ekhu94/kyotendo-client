import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Card } from 'react-bootstrap';

import './YoutubeVideoPlayer.css';
import backgroundImg from '../assets/Animal-crossing-4.jpg';
import YoutubeDetail from './YoutubeDetail';
import YoutubeSearch from './YoutubeSearch';
import YoutubeVideoList from './YoutubeVideoList';
//! custom hook
import useVideos from '../hooks/useVideos';

const YoutubeVideoPlayer = ({ gameSlug }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const {videos, search} = useVideos(`${gameSlug} video game`);

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        setSelectedVideo(videos[0]);
    }, [videos]);

    const formatSlug = () => {
        if (gameSlug) {
            const words = gameSlug.split('-');
            return words.map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
        }
    };

    return (
        <div
            className="py-5"
            id="video-container"
            style={{backgroundImage: `url(${backgroundImg})`}}
        >
            <Container>
                <Row className="justify-content-center mt-4">
                    <Card style={{borderRadius: '20px'}} className="col-10 col-md-12 p-0">
                        <h1 className="youtube-header text-center py-4">{formatSlug()} Videos</h1>
                        <YoutubeSearch
                            onSearchSubmit={search}
                        />
                        <Row className="justify-content-center">
                            <div className="col-7">
                                <YoutubeDetail
                                    video={selectedVideo}
                                />
                            </div>
                            <div className="col-4">
                                <YoutubeVideoList
                                    videos={videos}
                                    onVideoSelect={setSelectedVideo}
                                />
                            </div>
                        </Row>
                    </Card>
                </Row>
            </Container>
        </div>
    );
};

export default YoutubeVideoPlayer;