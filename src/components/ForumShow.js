import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Container, Row } from 'react-bootstrap';

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
                    <Row className="justify-content-start">
                        <PostObject key={post.id} post={post} />
                    </Row>
                );
            });
        }
    };

    return (
        <div>
            {forums.length ?
                <Container>
                    {renderPosts()}
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