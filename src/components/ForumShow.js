import React from 'react';
import { connect } from 'react-redux';

const ForumShow = ({ forumSlug }) => {
    return (
        <div>{forumSlug}</div>
    )
};

export default ForumShow;