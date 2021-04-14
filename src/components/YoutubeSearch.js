import React, { useState, useEffect } from 'react';
import { Form, Row } from 'react-bootstrap';

const YoutubeSearch = ({ gameSlug, onSearchSubmit }) => {
    const [term, setTerm] = useState('');

    useEffect(() => {
        console.log(gameSlug)
    }, []);

    const onFormSubmit = e => {
        e.preventDefault();
        onSearchSubmit(term);
    };

    return (
        <Row className="justify-content-center">
            <Form className="mt-5 mb-4 col-11" onSubmit={onFormSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="text"
                        size="lg"
                        placeholder="Search for videos..."
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                    />
                    <Form.Text className="text-muted mt-1">
                        Note: search results are limited. Be sure to save videos to your collection!
                    </Form.Text>
                </Form.Group>
            </Form>
        </Row>
    );
};

export default YoutubeSearch;