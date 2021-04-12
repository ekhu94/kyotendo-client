import React, { useHistory } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Button, Icon, Label } from 'semantic-ui-react';

const BackButton = () => {
    const history = useHistory();
    return (
        <Row className="justify-content-start">
            <Button
                className="ml-5 mb-4"
                size="mini"
                color="red"
                content='Back'
                icon='backward'
                labelPosition='left'
                onClick={() => history.goBack()}
            />
        </Row>
    );
};

export default BackButton;