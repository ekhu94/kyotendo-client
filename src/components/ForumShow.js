import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Container, Row, Card } from 'react-bootstrap';

import PageLoader from './PageLoader';
import PostObject from './PostObject';

const ForumShow = ({ forums, getForums, forumSlug, forum, getForumShow }) => {

    useEffect(() => {
        getForums();

    }, []);

    useEffect(() => {
        if (forums.length) {
            const selected = forums.find(f => f.slug === forumSlug);
            getForumShow(selected.id)
        }
    }, [forums])

        // if (forums.length !== 0) {
        //     console.log('inside')
        //     const forum = forums.find(f => f.slug == forumSlug);
        //     getForumShow(forum);
        //     console.log(forumShow)
        // }

    //    return () => {
    //        getForumShow({});
    //    }


    const renderPosts = () => {
        if (forum.posts) {
            return forum.posts.sort((a, b) => b.upvotes - a.upvotes).map(post => {
                return (
                    <Row className="justify-content-start" key={post.id}>
                        <PostObject post={post} />
                    </Row>
                );
            });
        }
    };

    return (
        <div>
            {forums.length ?
                <Container>
                    <Row className="justify-content-center">
                        <Card
                            className="my-5 col-11 col-md-8 p-3 p-md-5"
                            style={{ borderRadius: '20px' }}
                        >
                            {renderPosts()}
                        </Card>
                    </Row>
                </Container>
                :
                <PageLoader />
            }
        </div>
    )
};

const mapStateToProps = state => {
    console.log(state)
    return {
        forums: state.forums,
        forum: state.forumShow
    }
};

const { getForums, getForumShow } = action.forums;

export default connect(mapStateToProps, { getForums, getForumShow })(ForumShow);