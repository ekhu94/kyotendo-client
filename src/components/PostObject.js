import React, { useState } from 'react';
import { Card, Media, Button, Row } from 'react-bootstrap';

const PostObject = ({ post }) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderPost = () => {
        switch (post.post_type) {
            case 'discussion':
                return (
                    <Media className="my-4">
                        {/* <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src="holder.js/64x64"
                            alt="Generic placeholder"
                        /> */}
                        <Media.Body>
                            <Row className="align-items-center mb-4">
                                <h4 className="ml-4">{post.title}
                                    <span className="ml-4">
                                        <Button variant="info" size="sm" onClick={() => setIsOpen(!isOpen)}>
                                            {isOpen ? <i className="fas fa-minus" /> : <i className="fas fa-plus"></i>}
                                        </Button>
                                    </span>
                                </h4>
                            </Row>
                            <Row className="justify-content-start">
                                {isOpen ?
                                    <div className="p-5">
                                        {renderParagraphs(post.content_text)}
                                    </div>
                                :
                                    null
                                }
                            </Row>
                        </Media.Body>
                    </Media>
                )
            case 'image':
                return (
                    <Media className="my-4">
                        <img
                            width={64}
                            height={64}
                            className="mr-5"
                            src={post.content_url}
                            alt={post.title}
                        />
                        {/* show this conditionally */}
                        <Media.Body>
                            <Row className="align-items-center mb-4">
                                <h4>{post.title}
                                    <span className="ml-4">
                                        <Button variant="info" size="sm" onClick={() => setIsOpen(!isOpen)}>
                                            {isOpen ? <i className="fas fa-minus" /> : <i className="fas fa-plus"></i>}
                                        </Button>
                                    </span>
                                </h4>
                            </Row>
                            <Row className="justify-content-start">
                                {isOpen ?
                                    <img style={{ width: '400px' }} src={post.content_url} alt={post.title} />
                                : null
                                }
                            </Row>
                        </Media.Body>
                    </Media>
                );
            case 'video':
                const url = post.content_url.replace('watch?v=', 'embed/');
                return (
                    <Media className="my-4">
                        <img
                            width={64}
                            height={64}
                            className="mr-5"
                            src={post.thumbnail}
                            alt={post.title}
                        />
                        {/* show this conditionally */}
                        <Media.Body>
                            <Row className="align-items-center mb-4">
                                <h4>{post.title}
                                    <span className="ml-4">
                                        <Button variant="info" size="sm" onClick={() => setIsOpen(!isOpen)}>
                                            {isOpen ? <i className="fas fa-minus" /> : <i className="fas fa-plus"></i>}
                                        </Button>
                                    </span>
                                </h4>
                            </Row>
                            <Row className="justify-content-start">
                                {isOpen ?
                                    <iframe src={url} title={post.title} />
                                : null
                                }
                            </Row>
                        </Media.Body>
                    </Media>
                );
            default:
                return null;
        }
    }

    const renderParagraphs = content => {
        const parArr = content.replace(/&amp;#x200B;/ig, '').split(/\n+/ig)
        console.log(parArr);
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