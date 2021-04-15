import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Fade, ResponsiveEmbed } from 'react-bootstrap';
import './ProfileVideoRow.css';

const ProfileVideoRow = ({ video }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <tr
                className="video-row"
                aria-controls="fade-video"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                <td>{video.title}</td>
                <Link to={`/games/${video.game.slug}`}>
                    <td onClick={e => e.stopPropagation()}>{video.game.name}</td>
                </Link>
            </tr>
            <tr>
                <td style={{minWidth: '100% !important'}} className={`${!isOpen ? "d-none" : ""}`} id="fade-video" colSpan="2">
                    <Fade in={isOpen}>
                        <div>
                            <ResponsiveEmbed aspectRatio="16by9">
                                <iframe
                                    src={video.video_url}
                                    allow="fullscreen"
                                    title={video.title}
                                    className="iframe"
                                />
                            </ResponsiveEmbed>
                        </div>
                    </Fade>
                </td>
            </tr>
        </>
    );
};

export default ProfileVideoRow;