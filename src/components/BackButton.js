import React, { useHistory } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import './BackButton.css';

const BackButton = () => {
    const history = useHistory();
    return (
        <Row className="justify-content-start">
            <Button
                className="ml-5 mb-4 back-btn"
                size="mini"
                color="red"
                content='back'
                icon='backward'
                labelPosition='left'
                onClick={() => history.goBack()}
            />
        </Row>
    );
};

export default BackButton;