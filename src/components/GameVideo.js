import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const GameVideo = ({ video }) => {
    return (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player p-0'
            url={video}
            width='100%'
            height='100%'
            controls = {true}
            style={{borderRadius: '20px !important'}}
          />
        </div>
    );
};

export default GameVideo;