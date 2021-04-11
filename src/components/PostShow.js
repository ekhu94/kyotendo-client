import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Container, Row, Card } from 'react-bootstrap';
import { List, Image } from 'semantic-ui-react';

import './PostShow.css';
import backgroundImg from '../assets/forum-background.jpg';

const PostShow = ({ postId, post, getPostShow, resetPostShow }) => {

    useEffect(() => {
        getPostShow(postId);

        return () => {
            resetPostShow();
        }
    }, []);

    return (
        <>
            <div className="post-show-container" style={{backgroundImage: `url(${backgroundImg})`, paddingBottom: '90px'}}>
                <Container>
                    <Row className="justify-content-center">
                        <Card id="post-show-card" className="p-0 pb-5 col-10 col-md-8 col-lg-7" style={{ borderRadius: '20px' }}>
                            <h1 id="post-show-header" className="p-4 mb-4 text-center" style={{letterSpacing: '0.5rem'}}>{post.title}</h1>
                        </Card>
                    </Row>
                </Container>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        post: state.post
    }
};

const { getPostShow, resetPostShow } = action.posts;

export default connect(mapStateToProps, { getPostShow, resetPostShow })(PostShow);