import React from 'react';
import { Media } from 'react-bootstrap';

const PostObject = ({ post }) => {

    const renderPost = () => {
        switch (post.post_type) {
            case 'discussion':
                return (
                    <Media>
                        {/* <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src="holder.js/64x64"
                            alt="Generic placeholder"
                        /> */}
                        <Media.Body>
                            <h5>{post.title}</h5>
                            {/* show this conditionally */}
                            <p>
                                {post.content_text}
                            </p>
                        </Media.Body>
                    </Media>
                )
            case 'image':
                return (
                    <Media>
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={post.content_url}
                            alt={post.title}
                        />
                        {/* show this conditionally */}
                        <Media.Body>
                            <h5>{post.title}</h5>
                            <img src={post.content_url} alt={post.title} />
                        </Media.Body>
                    </Media>
                );
            case 'video':
                return (
                    <Media>
                        <iframe
                            width={64}
                            height={64}
                            className="mr-3"
                            src={post.content_url}
                            title={post.title}
                        />
                        {/* show this conditionally */}
                        <Media.Body>
                            <h5>{post.title}</h5>
                            <iframe src={post.content_url} title={post.title} />
                        </Media.Body>
                    </Media>
                );
            default:
                return null;
        }
    }

    return (
        <div>
            {renderPost()}
        </div>
    );
};

export default PostObject;