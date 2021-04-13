import React from 'react';
import './YoutubeVideoList.css';
import YoutubeItem from './YoutubeItem';

const YoutubeVideoList = ({ videos, onVideoSelect }) => {
    const renderedVideos = videos.map(vid => {
        return (
            <YoutubeItem
                key={vid.id.videoId}
                video={vid}
                onVideoSelect={onVideoSelect}
            />
        );
    });

    return (
        <div className="ui relaxed divided list video-list">
            {renderedVideos}
        </div>
    );
};

export default YoutubeVideoList;