import React from 'react';

import { ButtonGroup, Button } from 'react-bootstrap';

const GamesSortButtons = ({ onSortClick }) => {
    return (
        <ButtonGroup size="lg" className="mb-4">
            <Button className="px-3 btn-type-img" variant="outline-info" onClick={() => onSortClick('new')}>New</Button>
            <Button className="px-3 btn-type-disc" variant="outline-danger" onClick={() => onSortClick('name')}>Name</Button>
            <Button className="px-3 btn-type-vid" variant="outline-success" onClick={() => onSortClick('rating')}>Rating</Button>
        </ButtonGroup>
    );
};

export default GamesSortButtons;