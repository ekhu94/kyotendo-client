import React, { useState } from 'react';
import { Form, Row } from 'react-bootstrap';

const YoutubeSearch = ({ gameSlug, onSearchSubmit }) => {
    const [term, setTerm] = useState('');

    const onFormSubmit = e => {
        e.preventDefault();
        onSearchSubmit(term);
    };

    return (
        <Row className="justify-content-center">
            <Form className="my-5 col-11" onSubmit={onFormSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        placeholder="Video Search..."
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </Row>
    );
};

export default YoutubeSearch;