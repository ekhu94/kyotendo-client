import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Link } from 'react-router-dom';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { Input } from 'semantic-ui-react';

import './ForumShow.css';
import backgroundImg from '../assets/forum-background.jpg';
import noPostImg from '../assets/sad-pikachu.jpg';
import BackButton from './BackButton';
import PageLoader from './PageLoader';
import PostObject from './PostObject';
import TopPosters from './TopPosters';
import TopPostersTop from './TopPostersTop';

const ForumShow = ({ auth, forums, getForums, resetForums, forumSlug, forum, getForumShow, resetForumShow, postIdx, setPostIdx, resetPostIdx }) => {
    const [loaded, setLoaded] = useState(false);
    const [displayPosts, setDisplayPosts] = useState([]);
    const [term, setTerm] = useState('');

    useEffect(() => {
        const search = setTimeout(() => {
            if (forum && forum.posts) {
                if (term === '') {
                setDisplayPosts(forum.posts);
                } else {
                    const query = forum.posts.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
                    setDisplayPosts(query);
                }
            }
        }, 500);

        return () => {
            clearInterval(search);
        }
        
    }, [term]);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            const windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                setTimeout(() => {
                    setPostIdx();
                }, 1000);
            }
        }
        if (!forums.length) {
            getForums();
        }
        setPostIdx();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            resetPostIdx();
            setDisplayPosts([])
            resetForums();
            resetForumShow();
        }
    }, [])

    useEffect(() => {
        const fetchNewForum = async () => {
            if (forums && forums.length) {
                const selected = forums.find(f => f.slug === forumSlug);
                await getForumShow(selected.id);
            }
        }
        fetchNewForum();
    }, [forums]);

    useEffect(() => {
        console.log(forum)
        if (forum && forum.posts) {
            setDisplayPosts(forum.posts);
            if (displayPosts) {
                setTimeout(() => {
                    setLoaded(true);
                }, 1000);
            }
        }
    }, [forum])

    useEffect(() => {
        if (forum.posts && forum.posts.length !== displayPosts.length) {
            setDisplayPosts(forum.posts);
        }
    }, [displayPosts]);

    const renderPosts = () => {
        if (displayPosts.length === 0) {
            return (
                <Row className="justify-content-start my-4">
                    <p style={{fontSize: '1.2rem'}}>No posts matching that search were found...</p>
                </Row>
            )
        }
        if (displayPosts && displayPosts.length) {
            //? get a chunk of 20 posts
            const collection = displayPosts.sort((a, b) => b.upvotes - a.upvotes).slice(0, postIdx);
            return collection.map(post => {
                return (
                    <Row className="justify-content-start" key={post.id}>
                        <PostObject post={post} pathname={`/forums/${forumSlug}`} />
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
            {loaded ?
                <Container fluid>
                    {/* <ScrollTop /> */}
                    <TopPostersTop forum={forum} />
                    <Row className="justify-content-center" style={{marginTop: '10px'}}>
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
                                    backgroundColor: 'var(--blue-tertiary)',
                                    border: 'none',
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
                            <div className="mt-4 mb-3 ml-2">
                                <BackButton label="back to all forums" url="/forums" />
                            </div>
                            <Row className="justify-content-center mb-3">
                                <Input className="col-11" placeholder="Search for posts..." size="large" type="text" value={term} onChange={e => setTerm(e.target.value)} />
                            </Row> 
                            {forum.posts && forum.posts.length !== 0 ?
                                <ul className="ul-unstyled">
                                    {renderPosts(forum.posts)}
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
                                        backgroundColor: 'var(--red-secondary)',
                                        border: 'none',
                                        textShadow: "5px 4px 6px rgba(0,0,0,0.67)",
                                        letterSpacing: "0.3em",
                                        lineHeight: '1.5',
                                        borderTopLeftRadius: '20px',
                                        borderTopRightRadius: '20px',
                                        fontWeight: "500"
                                    }}
                                >
                                    {forum.posts && forum.posts.length ? 'Top Users' : 'Start the party!'}
                                </h3>
                                <div className="px-5">
                                    <TopPosters forum={forum} />
                                    {!auth.user.id ?
                                        <Row className="justify-content-center">
                                            <div style={{color: 'var(--dark)', marginTop: '16px'}} className="text-center">Want to post here?</div>  
                                        </Row>
                                    : null }
                                    {auth.user.id ? 
                                        <Link to={`/new/${forum.slug}/post`}>
                                            <Button
                                                variant="info"
                                                block
                                                className="p-3"
                                                style={{
                                                    borderRadius: '18px',
                                                    letterSpacing: '0.2rem',
                                                    marginTop: '22px',
                                                    marginBottom: '22px'
                                                }}
                                            >
                                                Create Post
                                            </Button>
                                        </Link>
                                    :
                                        <Link to={`/auth`}>
                                            <Button
                                                variant="info"
                                                block
                                                className="p-3"
                                                style={{
                                                    borderRadius: '18px',
                                                    letterSpacing: '0.2rem',
                                                    marginTop: '6px',
                                                    marginBottom: '22px'
                                                }}
                                            >
                                                Login/Signup
                                            </Button>
                                        </Link>
                                    }
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
        auth: state.auth,
        forums: state.forums,
        forum: state.forumShow,
        postIdx: state.postIdx
    }
};

const { getForums, resetForums, getForumShow, resetForumShow } = action.forums;
const { setPostIdx, resetPostIdx } = action.posts;

export default connect(mapStateToProps, { getForums, resetForums, getForumShow, resetForumShow, setPostIdx, resetPostIdx })(ForumShow);