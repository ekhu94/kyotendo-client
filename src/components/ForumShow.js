import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Container, Row, Card } from 'react-bootstrap';

import PageLoader from './PageLoader';
import PostObject from './PostObject';

const ForumShow = ({ forums, getForums, forumSlug, forum, getForumShow, postIdx, setPostIdx }) => {

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            const windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                console.log('bottom reached')
                setPostIdx();
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
            //? get a chunk of 20 posts
            const collection = forum.posts.sort((a, b) => b.upvotes - a.upvotes).slice(0, postIdx);
            console.log(collection);
            return collection.map(post => {
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
                            className="my-5 col-11 col-md-8 pl-5"
                            style={{ borderRadius: '20px' }}
                        >
                            <ul className="list-unstyled">
                                {renderPosts()}
                            </ul>
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
        forum: state.forumShow,
        postIdx: state.postIdx
    }
};

const { getForums, getForumShow } = action.forums;
const { setPostIdx } = action.posts;

export default connect(mapStateToProps, { getForums, getForumShow, setPostIdx })(ForumShow);