import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Card } from 'react-bootstrap';

import './YoutubeVideoPlayer.css';
import backgroundImg from '../assets/Animal-crossing-4.jpg';
import YoutubeSearch from './YoutubeSearch';
//! custom hook
import useVideos from '../hooks/useVideos';

const YoutubeVideoPlayer = ({ gameSlug }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const {videos, search} = useVideos('react javascript');

    useEffect(() => {
        setSelectedVideo(videos[0]);
    }, [videos]);

    return (
        <div
                className="pt-5"
                id="video-container"
                style={{backgroundImage: `url(${backgroundImg})`}}
        >
            <Container>
                <Row className="justify-content-center mt-5">
                    <Card className="col-10">
                        <YoutubeSearch
                            onSearchSubmit={search}
                        />
                    </Card>
                </Row>
            </Container>
        </div>
    );
};

export default YoutubeVideoPlayer;