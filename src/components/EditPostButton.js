import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import './EditPostButton.css';

const EditPostButton = ({ forumSlug }) => {

    return (
        <Link to={`/edit/${forumSlug}/post`}>
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