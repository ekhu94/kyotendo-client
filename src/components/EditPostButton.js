import React from 'react';
import { Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import './EditPostButton.css';

const EditPostButton = ({ onPostDeleteClick }) => {

    const onEditClick = () => {
        onPostDeleteClick();
    };

    return (
        <Row className="justify-content-start">
            <Button
                className="edit-btn"
                size="mini"
                color="teal"
                content="edit post"
                icon='edit'
                labelPosition='right'
                onClick={onEditClick}
            />
        </Row>
    );
};

export default EditPostButton;