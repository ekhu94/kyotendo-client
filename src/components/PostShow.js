import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Container, Row, Card, Badge, Fade, ResponsiveEmbed } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';

import { api } from '../services/api';
import './PostShow.css';
import avatars from '../assets/icons/avatars/avatarIcons';
import backgroundImg from '../assets/forum-background.jpg';
import PageLoader from './PageLoader';
import ScrollTop from './ScrollTop';
import UpvoteButtons from './UpvoteButtons';


const PostShow = ({ postId, post, getPostShow, resetPostShow }) => {
    const [loaded, setLoaded] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            await getPostShow();
            if (post) {
                setLoaded(true)
            }
        }
        
        fetchPost();

        return () => {
            resetPostShow();
            setLoaded(false);
        }
    }, []);

    useEffect(() => {
        // const fetchUser = async () => {
        //     if (post.id) {
        //         const res = await api.rails.get(`/users/${post.user_id}`);
        //         setUser(res.data);
        //         if (user) {
        //             setLoaded(true)
        //         }
        //     }
        // };

        // fetchUser();
        console.log(post)
    }, [post]);

    const renderPost = () => {
        switch (post.post_type) {
            case 'discussion':
                return (
                    <Container className="p-3 p-md-4" key={post.id}>
                        <Card>
                            <Row className="align-items-center mb-4">
                                <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} className="col-1" />
                                <div className="col-10 post-title">
                                    {/* {renderUserLink()} */}
                                    <h4
                                        className="d-inline mr-0 ml-3 ml-md-0"
                                    >
                                        {post.title}
                                        <Badge
                                            pill
                                            style={{backgroundColor: 'var(--red-primary)', cursor: 'default'}}
                                            className="ml-2"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {post.post_type}
                                        </Badge>
                                    </h4>
                                    <Link to={`${window.location.pathname}/${post.id}`}>
                                        {/* {renderCommentLine()} */}
                                    </Link>                         
                                </div>
                            </Row>
                            <Row className="justify-content-start">
                                <Fade in={isOpen}>
                                    <div id="fade-disc" className={`p-2 ${!isOpen ? "d-none" : ""}`}>
                                        {renderParagraphs(post.content_text)}
                                    </div>
                                </Fade>
                            </Row>
                        </Card>
                    </Container>
                )
            case 'image':
                return (
                    <Container>
                        <Card>
                            <Row className="align-items-center mb-4">
                                <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} className="col-1" />
                                <div className="col-10 post-title">
                                    {/* {renderUserLink()} */}
                                    <h4
                                        className="d-inline mr-0 ml-3 ml-md-0"
                                    >
                                        {post.title}
                                        <Badge
                                            pill
                                            style={{backgroundColor: 'var(--blue-primary)', cursor: 'default'}}
                                            className="ml-2"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {post.post_type}
                                        </Badge>
                                    </h4>
                                    <Link to={`${window.location.pathname}/${post.id}`}>
                                        {/* {renderCommentLine()} */}
                                    </Link>
                                </div>
                            </Row>
                            <Row className="justify-content-start">
                                <Fade in={isOpen}>
                                    <div id="fade-image" className={`${!isOpen ? "d-none" : ""}`}>
                                        <img className="post-img" src={post.content_url} alt={post.title} />
                                    </div>
                                </Fade>
                            </Row>
                        </Card>
                    </Container>
                );
            case 'video':
                const url = post.content_url.replace('watch?v=', 'embed/');
                return (
                    <div>
                        {/* <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} /> */}                        
                        <h4
                            className="d-inline mr-0 ml-3 ml-md-0"
                            // style={{textAlign: 'center !important'}}
                        >
                            {post.title}
                            <Badge
                                pill
                                style={{backgroundColor: 'var(--lime)', cursor: 'default'}}
                                onClick={e => e.stopPropagation()}
                                className="ml-2"
                            >
                                {post.post_type}
                            </Badge>
                        </h4>
                        {/* {renderUserLink()} */}
                        <Link to={`${window.location.pathname}/${post.id}`}>
                            {/* {renderCommentLine()} */}
                        </Link>
                    </div>
                    // <Container fluid className="p-3 p-md-4" key={post.id}>
                    //     <Row className="justify-content-center align-items-center mb-4">
                    //         <div className="col-10">
                    //             <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} />
                    //             <div className="post-title">
                    //                 {/* {renderUserLink()} */}
                    //                 <h4
                    //                     onClick={() => setIsOpen(!isOpen)}
                    //                     aria-controls="fade-image"
                    //                     aria-expanded={isOpen}
                    //                     className="d-inline mr-0 ml-3 ml-md-0 text-center"
                    //                 >
                    //                     {post.title}
                    //                     <Badge
                    //                         pill
                    //                         style={{backgroundColor: 'var(--lime)', cursor: 'default'}}
                    //                         onClick={e => e.stopPropagation()}
                    //                         className="ml-2"
                    //                     >
                    //                         {post.post_type}
                    //                     </Badge>
                    //                 </h4>
                    //                 <Link to={`${window.location.pathname}/${post.id}`}>
                    //                     {/* {renderCommentLine()} */}
                    //                 </Link>
                    //             </div>
                    //         </div>
                    //     </Row>
                    //     <Row className="justify-content-start">
                    //         <Fade in={isOpen}>
                    //             <div id="fade-video" className={`iframe-sizing ${!isOpen ? "d-none" : ""}`}>
                    //                 <ResponsiveEmbed aspectRatio="16by9">
                    //                     <iframe
                    //                         src={url}
                    //                         allow="fullscreen"
                    //                         title={post.title}
                    //                         className="iframe"
                    //                     />
                    //                 </ResponsiveEmbed>
                    //             </div>
                    //         </Fade>
                    //     </Row>
                    // </Container>
                );
            default:
                return null;
        }
    }

    const renderParagraphs = content => {
        const parArr = content.replace(/&amp;#x200B;/ig, '').split(/\n+/ig)
        return parArr.map(par => {
            return <p className="mr-4">{par}</p>
        });
    };

    const renderUserLink = () => {
        if (user && user.id) {
            const idx = Math.floor(Math.random() * avatars.length);
            const avatar = avatars.find(a => avatars.indexOf(a) === idx);
            const slug = user.username.split(' ').join('');
            if (avatar) {
                return (
                    <div className="user-icon ml-3 ml-md-0">
                        <span>by </span>
                        <Link
                            to={`/users/${slug}`}
                            style={{color: 'var(--blue-secondary)'}}
                        >
                            {slug}
                        </Link>
                        <img
                            className="ml-2"
                            src={avatar.props.src}
                            alt={avatar.props.alt}
                            style={{width: '20px', height: '20px'}}
                        />
                    </div>
                );
            }
        }
    }


    return (
        <>
            <div className="post-show-container" style={{backgroundImage: `url(${backgroundImg})`, paddingBottom: '90px'}}>
                {loaded ?
                    <>
                        <ScrollTop />
                        <Container>
                            <Row className="justify-content-center">
                                <Card id="post-show-card" className="p-0 pb-5 col-10 col-md-8" style={{ borderRadius: '20px' }}>
                                    <h1 id="post-show-header" className="px-2 py-4 mb-4 text-center" style={{letterSpacing: '0.5rem'}}>{post.title}</h1>
                                    <Row className="justify-content-center">
                                        {/* {renderPost()} */}
                                    </Row>
                                    
                                </Card>
                            </Row>
                        </Container>
                    </>
                : <PageLoader /> }
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