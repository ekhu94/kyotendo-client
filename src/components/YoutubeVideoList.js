import React from 'react';
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
        <div className="ui relaxed divided list">
            {renderedVideos}
        </div>
    );
};

export default YoutubeVideoList;