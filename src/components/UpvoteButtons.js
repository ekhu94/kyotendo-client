import React, { useState, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import upvoteImg from '../assets/icons/mario-upvote-icon.jpg';
import downvoteImg from '../assets/icons/bowser-downvote-icon.jpg';
import './UpvoteButtons.css';
import axios from 'axios';
import { api } from '../services/api';

const UpvoteButtons = ({ postId, postUpvotes }) => {
    const [upvoteCount, setUpvoteCount] = useState(postUpvotes)
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const { changeUpvotes } = api.upvotes;

    const onUpvoteClick = async () => {
        setDownvoted(false);
        if (upvoteCount >= postUpvotes) setUpvoted(true);
        if (!upvoted) {
            setUpvoteCount(upvoteCount + 1);
            await api.rails.patch(`/posts/${postId}`, {
                upvotes: upvoteCount + 1
            });
        }
    }

    const onDownvoteClick = async () => {
        setUpvoted(false);
        if (upvoteCount <= postUpvotes) setDownvoted(true);
        if (!downvoted) {
            setUpvoteCount(upvoteCount - 1);
            await api.rails.patch(`/posts/${postId}`, {
                upvotes: upvoteCount - 1
            });
        }
    }

    const renderUpvoteCount = () => {
        const styles = {letterSpacing: '0.05rem'};
        if (upvoted) {
            styles.color = 'var(--red-primary';
        }
        if (downvoted) {
            styles.color = 'var(--blue-secondary';
        }
        return <div style={styles}>{upvoteCount}</div>
    }

    return (
            <div>
                <img
                    src={upvoteImg}
                    alt="upvote"
                    className={`upvote-img d-block ${!upvoted ? 'no-vote' : ''}`}
                    onClick={onUpvoteClick}
                />
                {renderUpvoteCount()}
                <img
                    src={downvoteImg}
                    alt="downvote"
                    className={`upvote-img d-block ${!downvoted ? 'no-vote' : ''}`}
                    onClick={onDownvoteClick}
                />
            </div>
    );
};

export default UpvoteButtons;