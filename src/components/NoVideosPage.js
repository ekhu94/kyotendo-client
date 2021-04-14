import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';

import noVidImg from '../assets/no-videos.jpg';
import BackButton from './BackButton';

const NoVideosPage = ({ gameSlug, gameShow }) => {

    return (
        <Container>
            <BackButton label="back to game page" url={`/games/${gameSlug}`} />
            <Row className="justify-content-center mt-2">
                <Card style={{borderRadius: '20px'}} className="col-10 col-md-12 p-0">
                    <h1 className="youtube-header text-center py-4 mb-0">{gameShow.name} Videos</h1>
                        <h4 className="mt-5 mb-1 text-center">Oh dear! It looks like you've hit your quota for today.</h4>
                        <h4 className="mb-4 text-center">Please try again later!</h4>
                        <img
                            src={noVidImg}
                            alt="noposts"
                            style={{
                                width: '25%',
                                height: 'auto',
                                margin: '3rem auto',
                                textAlign: 'center',
                                border: 'none',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px'
                            }}
                        />
                </Card>
            </Row>
        </Container>
    );
};

export default NoVideosPage;