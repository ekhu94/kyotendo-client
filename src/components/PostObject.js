import React, { useState } from 'react';
import { ResponsiveEmbed, Media, Button, Container, Row, Fade, Badge } from 'react-bootstrap';
import './PostObject.css';

import UpvoteButtons from './UpvoteButtons';

const PostObject = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderPost = () => {
        switch (post.post_type) {
            case 'discussion':
                return (
                    <Media as="li" className="p-3 p-md-4" key={post.id}>
                        <Media.Body>
                            <Container>
                                <Row className="align-items-center mb-4">
                                    <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} className="col-1" />
                                    <div className="col-10 post-title">
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
                                <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} className="col-1" />
                                <div className="col-10 post-title">
                                    <h4
                                        onClick={() => setIsOpen(!isOpen)}
                                        aria-controls="fade-image"
                                        aria-expanded={isOpen}
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
                                <UpvoteButtons postId={post.id} postUpvotes={post.upvotes} className="col-1" />
                                <div className="col-10 post-title">
                                    <h4
                                        onClick={() => setIsOpen(!isOpen)}
                                        aria-controls="fade-image"
                                        aria-expanded={isOpen}
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
                                    
                                </div>
                                {/* <h4 className="ml-3 ml-md-0 post-title">{post.title}
                                    <span className="ml-2 ml-sm-3">
                                        <Button
                                            variant="info"
                                            size="sm"
                                            onClick={() => setIsOpen(!isOpen)}
                                            aria-controls="fade-video"
                                            aria-expanded={isOpen}
                                        >
                                            {isOpen ? <i className="fas fa-minus" /> : <i className="fas fa-plus"></i>}
                                        </Button>
                                    </span>
                                </h4> */}
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
                                {/* {isOpen ?
                                    <div className="iframe-sizing">
                                        <ResponsiveEmbed aspectRatio="16by9">
                                            <iframe
                                                src={url}
                                                allow="fullscreen"
                                                title={post.title}
                                                className="iframe"
                                            />
                                        </ResponsiveEmbed>
                                    </div>
                                : null
                                } */}
                            </Row>
                            </Container>
                        </Media.Body>
                    </Media>
                );
            default:
                return null;
        }
    }

    const renderParagraphs = content => {
        const parArr = content.replace(/&amp;#x200B;/ig, '').split(/\n+/ig)
        return parArr.map(par => {
            return <p>{par}</p>
        });
    };

    return (
        <div>
            {renderPost()}
        </div>
    );
};

export default PostObject;