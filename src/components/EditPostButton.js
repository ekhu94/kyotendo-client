import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import './EditPostButton.css';

const EditPostButton = ({ forumSlug, postId }) => {

    return (
        <Link to={`/edit/${forumSlug}/${postId}`}>
            <Button
                className="edit-btn"
                size="mini"
                color="teal"
                content="edit post"
                icon='edit'
                labelPosition='right'
            />
        </Link>
    );
};

export default EditPostButton;