import React from 'react';
import { Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import './DeletePostButton.css';

const DeletePostButton = ({ onPostDeleteClick }) => {

    const onDeleteClick = () => {
        onPostDeleteClick();
    };

    return (
        <Row className="justify-content-start">
            <Button
                className="delete-btn"
                size="mini"
                color="red"
                content="delete post"
                icon='delete'
                labelPosition='right'
                onClick={onDeleteClick}
            />
        </Row>
    );
};

export default DeletePostButton;