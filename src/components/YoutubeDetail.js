import React from 'react';

const YoutubeDetail = ({ video }) => {
    if (!video) return <div>Loading...</div>
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`
    return (
        <div style={{marginTop: '10px'}}>
            <div className="ui embed">
                <iframe
                    title="video player"
                    src={videoSrc}
                />
            </div>
            <div className="ui segment">
                <h4 className="ui header">
                    {video.snippet.title}
                </h4>
                <p>
                    {video.snippet.description}
                </p>
            </div>
        </div>
    );
};

export default YoutubeDetail;