import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { Link } from 'react-router-dom';
import { ResponsiveEmbed, Media, Button, Container, Row, Fade, Badge } from 'react-bootstrap';
import { api } from '../services/api';
import avatars from '../assets/icons/avatars/avatarIcons';
import './PostObject.css';

import UpvoteButtons from './UpvoteButtons';
// import { createPortal } from 'react-dom';

const PostObject = ({ auth, post, pathname }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            const res = await api.rails.get(`/users/${post.user_id}`);
            setUser(res.data)
        };
        getUser();
        return () => {
            setUser({});
        };
    }, []);

    const renderCommentLine = () => {
        switch (post.comments.length) {
            case 0:
                return (
                    <div className="ml-3 ml-md-0">
                        <span className="comment-link">No comments</span>
                        <Button
                            className="ml-3 py-1 py-md-2 px-2 px-md-3 align-items-center expand-btn"
                            variant="info"
                            style={{cursor: 'pointer'}}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-controls="fade-disc"
                            aria-expanded={isOpen}
                        >
                            <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`} />
                        </Button>
                    </div>
                );
            case 1:
                return (
                    <div className="ml-3 ml-md-0">
                        <span className="comment-link">1 comment</span>
                        <Button
                            className="ml-3 py-1 py-md-2 px-2 px-md-3 align-items-center expand-btn"
                            variant="info"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-controls="fade-image"
                            aria-expanded={isOpen}
                        >
                            <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`} />
                        </Button>
                    </div>
                );
            default:
                return (
                    <div className="ml-3 ml-md-0">
                        <span className="comment-link">{post.comments.length} comments</span>
                        <Button
                            className="ml-3 py-1 py-md-2 px-2 px-md-3 align-items-center expand-btn"
                            variant="info"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-controls="fade-video"
                            aria-expanded={isOpen}
                        >
                            <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`} />
                        </Button>
                    </div>
                );
        }
    };

    const renderPost = () => {
        switch (post.post_type) {
            case 'discussion':
                return (
                    <Media as="li" className="p-3 p-md-4" key={post.id}>
                        <Media.Body>
                            <Container>
                                <Row className="align-items-center mb-4">
                                    {auth.user && auth.user.id ?
                                        <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} className="col-1" />
                                    : null }
                                    <div className="col-10 post-title">
                                        {renderUserLink()}
                                        <Link to={`${pathname}/${post.id}`}>
                                        <h4
                                            onClick={() => setIsOpen(!isOpen)}
                                            aria-controls="fade-disc"
                                            aria-expanded={isOpen}
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
                                        </Link>
                                        {renderCommentLine()}                     
                                    </div>
                                </Row>
                                <Row className="justify-content-start">
                                    <Fade in={isOpen}>
                                        <div id="fade-disc" className={`p-2 ${!isOpen ? "d-none" : ""}`}>
                                            {renderParagraphs(post.content_text)}
                                        </div>
                                    </Fade>
                                </Row>
                            </Container>
                        </Media.Body>
                    </Media>
                )
            case 'image':
                return (
                    <Media as="li" className="p-3 p-md-4" key={post.id}>
                        <Media.Body>
                            <Container>
                            <Row className="align-items-center mb-4">
                                {auth.user && auth.user.id ?
                                    <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} className="col-1" />
                                : null }
                                <div className="col-10 post-title">
                                    {renderUserLink()}
                                    <Link to={`${pathname}/${post.id}`}>
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
                                    </Link>
                                    {renderCommentLine()}
                                </div>
                            </Row>
                            <Row className="justify-content-start">
                                <Fade in={isOpen}>
                                    <div id="fade-image" className={`${!isOpen ? "d-none" : ""}`}>
                                        <img className="post-img" src={post.content_url} alt={post.title} />
                                    </div>
                                </Fade>
                            </Row>
                            </Container>
                        </Media.Body>
                    </Media>
                );
            case 'video':
                const url = post.content_url.replace('watch?v=', 'embed/');
                return (
                    <Media as="li" className="p-3 p-md-4" key={post.id}>
                        <Media.Body>
                            <Container>
                            <Row className="align-items-center mb-4">
                                {auth.user && auth.user.id ?
                                    <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} className="col-1" />
                                : null }
                                <div className="col-10 post-title">
                                    {renderUserLink()}
                                    <Link to={`${pathname}/${post.id}`}>
                                    <h4
                                        className="d-inline mr-0 ml-3 ml-md-0"
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
                                    </Link>
                                    {renderCommentLine()}                                   
                                </div>
                            </Row>
                            <Row className="justify-content-start">
                                <Fade in={isOpen}>
                                    <div id="fade-video" className={`iframe-sizing ${!isOpen ? "d-none" : ""}`}>
                                        <ResponsiveEmbed aspectRatio="16by9">
                                            <iframe
                                                src={url}
                                                allow="fullscreen"
                                                title={post.title}
                                                className="iframe"
                                            />
                                        </ResponsiveEmbed>
                                    </div>
                                </Fade>
                            </Row>
                            </Container>
                        </Media.Body>
                    </Media>
                );
            default:
                return null;
        }
    }

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
                            to={`/users/${user.id}`}
                            style={{color: 'var(--blue-secondary)'}}
                        >
                            {slug}
                        </Link>
                        <img
                            className="mx-2"
                            src={avatar.props.src}
                            alt={avatar.props.alt}
                            style={{width: '20px', height: '20px'}}
                        />
                    </div>
                );
            }
        }
    }

    const renderParagraphs = content => {
        const parArr = content.replace(/&amp;#x200B;/ig, '').split(/\n+/ig)
        return parArr.map(par => {
            return <p className="mr-4">{par}</p>
        });
    };

    return (
        <div>
            {renderPost()}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        users: state.users
    };
};

const { getUsers } = action.users;

export default connect(mapStateToProps, { getUsers })(PostObject);