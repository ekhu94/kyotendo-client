import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './PostShow.css';

const PostShow = ({ postId }) => {

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <p>{postId}</p>
            <p>{postId}</p>
            <p>{postId}</p>
            <p>{postId}</p>
            <p>{postId}</p>
            <p>{postId}</p>
            <p>{postId}</p>
            <p>{postId}</p>
            <p>{postId}</p>
        </div>
    );
};

export default PostShow;