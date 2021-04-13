import React from 'react';

import BackButton from './BackButton';

const GameShow = ({ gameSlug }) => {
    return (
        <div>
        <div>{gameSlug}</div>
        <div>{gameSlug}</div>
        <div>{gameSlug}</div>
        <div>{gameSlug}</div>
        <BackButton label="back to all games" />
        </div>
    );
};

export default GameShow;