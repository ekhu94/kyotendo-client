import React, { useState } from 'react';
import { ResponsiveEmbed, Media, Button, Container, Row, Fade } from 'react-bootstrap';
import './PostObject.css';

const PostObject = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderPost = () => {
        switch (post.post_type) {
            case 'discussion':
                return (
                    <Media className="my-4 p-3 p-md-4" key={post.id}>
                        {/* <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src="holder.js/64x64"
                            alt="Generic placeholder"
                        /> */}
                        <Media.Body>
                            <Container>
                                <Row className="align-items-center mb-4">
                                    <h4 className="ml-3 ml-md-0 post-title">{post.title}
                                        <span className="ml-2 ml-sm-3">
                                            <Button
                                                variant="info"
                                                size="sm"
                                                onClick={() => setIsOpen(!isOpen)}
                                                aria-controls="fade-disc"
                                                aria-expanded={isOpen}
                                            >
                                                {isOpen ? <i className="fas fa-minus" /> : <i className="fas fa-plus"></i>}
                                            </Button>
                                        </span>
                                    </h4>
                                </Row>
                                <Row className="justify-content-start">
                                    <Fade in={isOpen}>
                                        <div id="fade-disc" className={`p-2 ${!isOpen ? "d-none" : ""}`}>
                                            {renderParagraphs(post.content_text)}
                                        </div>
                                    </Fade>
                                    {/* {isOpen ?
                                        <div id="fade-disc" className={`p-2 ${!isOpen ? "d-none" : ""}`}>
                                            {renderParagraphs(post.content_text)}
                                        </div>
                                    :
                                        null
                                    } */}
                                </Row>
                            </Container>
                        </Media.Body>
                    </Media>
                )
            case 'image':
                return (
                    <Media className="my-4 p-3 p-md-4" key={post.id}>
                        <img
                            width={56}
                            height={56}
                            className="thumbnail-img mr-md-3 mr-lg-4 d-none d-md-block"
                            src={post.content_url}
                            alt={post.title}
                        />
                        {/* show this conditionally */}
                        <Media.Body>
                            <Container>
                            <Row className="align-items-center mb-4">
                                <h4 className="ml-3 ml-md-0 post-title">{post.title}
                                    <span className="ml-2 ml-sm-3">
                                        <Button
                                            variant="info"
                                            size="sm"
                                            onClick={() => setIsOpen(!isOpen)}
                                            aria-controls="fade-image"
                                            aria-expanded={isOpen}
                                        >
                                            {isOpen ? <i className="fas fa-minus" /> : <i className="fas fa-plus"></i>}
                                        </Button>
                                    </span>
                                </h4>
                            </Row>
                            <Row className="justify-content-start">
                                <Fade in={isOpen}>
                                    <div id="fade-image" className={`${!isOpen ? "d-none" : ""}`}>
                                        <img style={{ width: '400px' }} src={post.content_url} alt={post.title} />
                                    </div>
                                </Fade>
                                {/* {isOpen ?
                                    <img style={{ width: '400px' }} src={post.content_url} alt={post.title} />
                                : null
                                } */}
                            </Row>
                            </Container>
                        </Media.Body>
                    </Media>
                );
            case 'video':
                const url = post.content_url.replace('watch?v=', 'embed/');
                return (
                    <Media className="my-4 p-3 p-md-4" key={post.id}>
                        <img
                            width={56}
                            height={56}
                            className="thumbnail-img mr-md-3 mr-lg-4 d-none d-md-block"
                            src={post.thumbnail}
                            alt={post.title}
                        />
                        {/* show this conditionally */}
                        <Media.Body>
                            <Container>
                            <Row className="align-items-center mb-4">
                                <h4 className="ml-3 ml-md-0 post-title">{post.title}
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
                                </h4>
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