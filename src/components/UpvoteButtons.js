import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import upvoteImg from '../assets/icons/mario-upvote-icon.jpg';
import downvoteImg from '../assets/icons/bowser-downvote-icon.jpg';
import './UpvoteButtons.css';
import { api } from '../services/api';

const UpvoteButtons = ({ auth, postId, postUpvotes, showPage }) => {
    const [ownPost, setOwnPost] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(postUpvotes)
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    useEffect(() => {
        const validateUpvoteClick = async () => {
            if (auth.user.id) {
                const res = await api.rails.get(`/users/${auth.user.id}`);
                const post = res.data.posts.find(p => p.id === postId);
                setOwnPost(!!post);
            }
        }
        validateUpvoteClick();

        return () => {
            setOwnPost(false);
        }
    }, []);

    const onUpvoteClick = async () => {
        if (!ownPost) {
            setDownvoted(false);
            if (upvoteCount >= postUpvotes) setUpvoted(true);
            if (!upvoted) {
                setUpvoteCount(upvoteCount + 1);
                await api.rails.patch(`/posts/${postId}`, {
                    upvotes: upvoteCount + 1
                });
            }
        }
    }

    const onDownvoteClick = async () => {
        if (!ownPost) {
            setUpvoted(false);
            if (upvoteCount <= postUpvotes) setDownvoted(true);
            if (!downvoted) {
                setUpvoteCount(upvoteCount - 1);
                await api.rails.patch(`/posts/${postId}`, {
                    upvotes: upvoteCount - 1
                });
            }
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
        return <div className="text-center" style={styles}>{upvoteCount}</div>
    }

    return (
            <div className={ showPage ? 'ml-4' : '' }>
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

const mapStateToProps = state => {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(UpvoteButtons);