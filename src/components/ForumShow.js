import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Container, Row, Card, Button } from 'react-bootstrap';

import './ForumShow.css';
import backgroundImg from '../assets/forum-background.jpg';
import noPostImg from '../assets/sad-pikachu.jpg';
import ScrollTop from './ScrollTop';
import PageLoader from './PageLoader';
import PostObject from './PostObject';
import TopPosters from './TopPosters';
import TopPostersTop from './TopPostersTop';

const ForumShow = ({ forums, getForums, forumSlug, forum, getForumShow, resetForumShow, postIdx, setPostIdx, resetPostIdx }) => {
    // const [bottom, setBottom] = useState(false);

    useEffect(() => {
        getForums();
        setPostIdx()
        const handleScroll = () => {
            const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            const windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                setPostIdx();
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            resetPostIdx();
        }
    }, [])

    // useEffect(() => {
    //     if (forum.posts && postIdx > forum.posts.length) {
    //         console.log("that's all the posts!!!")
    //         setBottom(true);
    //     }
    // }, [postIdx]);

    useEffect(() => {
        if (forums && forums.length) {
            const selected = forums.find(f => f.slug === forumSlug);
            getForumShow(selected.id)
        }

        return () => resetForumShow();
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
        <div
            id="forum-container"
            style={{backgroundImage: `url(${backgroundImg})`}}
        >
            {forums.length ?
                <Container fluid>
                    <ScrollTop />
                    <TopPostersTop forum={forum} />
                    <Row className="justify-content-center" style={{marginTop: '30px'}}>
                        <Card
                            className="mb-5 col-11 col-lg-8 mr-0 mr-lg-4"
                            style={{
                                paddingLeft: '0',
                                paddingRight: '0',
                                borderRadius: '20px'
                            }}
                        >
                            <h1
                                className="py-4 px-4 text-center"
                                style={{
                                    color: '#fff',
                                    backgroundColor: 'var(--dark)',
                                    textShadow: "5px 4px 6px rgba(0,0,0,0.67)",
                                    letterSpacing: "0.3em",
                                    lineHeight: '1.5',
                                    borderTopLeftRadius: '20px',
                                    borderTopRightRadius: '20px',
                                    fontWeight: "500",
                                    fontSize: "2rem"
                                }}
                            >
                                {forum.name}
                            </h1>
                            {forum.posts && forum.posts.length !== 0 ?
                                <ul className="ul-unstyled">
                                    {renderPosts()}
                                </ul>
                            :
                                <>
                                    <h4 className="text-center my-5">Pika pi...there aren't any posts here yet.</h4>
                                    <img
                                        src={noPostImg}
                                        alt="noposts"
                                        style={{
                                            width: '40%',
                                            height: 'auto',
                                            margin: '0 auto 3rem auto',
                                            textAlign: 'center',
                                            borderBottomLeft: '20px',
                                            borderBottomRight: '20px'
                                        }}
                                    />
                                </>
                            }
                        </Card>
                        <div className="mr-4 col-11 col-md-3 d-none d-lg-block">
                            <Card
                                className="position-fixed"
                                style={{
                                    borderRadius: '20px',
                                    height: 'auto'
                                }}
                            >
                                <h3
                                    id="users-title"
                                    className={`text-center mb-4 m-0 p-4 ${forum.posts && forum.posts.length !== 0 ? '' : 'no-post-header'}`}
                                    style={{
                                        color: '#fff',
                                        backgroundColor: 'var(--dark)',
                                        textShadow: "5px 4px 6px rgba(0,0,0,0.67)",
                                        letterSpacing: "0.3em",
                                        lineHeight: '1.5',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        fontWeight: "500"
                                    }}
                                >
                                    {forum.posts && forum.posts.length ? 'Top 5 Users' : 'Start the party!'}
                                </h3>
                                <div className="px-5">
                                    <TopPosters forum={forum} />
                                    <Button
                                        variant="info"
                                        block
                                        className="p-3"
                                        style={{
                                            borderRadius: '18px',
                                            letterSpacing: '0.25rem',
                                            marginTop: '28px',
                                            marginBottom: '28px'
                                        }}
                                    >
                                        Create Post
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    </Row>
                </Container>
                :
                <PageLoader />
            }
        </div>
    )
};

const mapStateToProps = state => {
    return {
        forums: state.forums,
        forum: state.forumShow,
        postIdx: state.postIdx
    }
};

const { getForums, getForumShow, resetForumShow } = action.forums;
const { setPostIdx, resetPostIdx } = action.posts;

export default connect(mapStateToProps, { getForums, getForumShow, resetForumShow, setPostIdx, resetPostIdx })(ForumShow);