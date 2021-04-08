import React from 'react';
import { Media } from 'react-bootstrap';

const PostObject = ({ post }) => {

    const renderPost = () => {
        switch (post.post_type) {
            case 'discussion':
                return (
                    <Media className="my-5">
                        {/* <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src="holder.js/64x64"
                            alt="Generic placeholder"
                        /> */}
                        <Media.Body>
                            <h3 className="mb-3">{post.title}</h3>
                            {/* show this conditionally */}
                            <p>
                                {renderParagraphs(post.content_text)}
                            </p>
                        </Media.Body>
                    </Media>
                )
            case 'image':
                return (
                    <Media className="my-5">
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={post.content_url}
                            alt={post.title}
                        />
                        {/* show this conditionally */}
                        <Media.Body>
                            <h3 className="mb-3">{post.title}</h3>
                            <img style={{ width: '400px' }} src={post.content_url} alt={post.title} />
                        </Media.Body>
                    </Media>
                );
            case 'video':
                const url = post.content_url.replace('watch?v=', 'embed/');
                return (
                    <Media className="my-5">
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={post.thumbnail}
                        />
                        {/* show this conditionally */}
                        <Media.Body>
                            <h3 className="mb-3">{post.title}</h3>
                            <iframe src={url} title={post.title} />
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