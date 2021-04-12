import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { List, Image } from 'semantic-ui-react';

import avatars from '../assets/icons/avatars/avatarIcons';

const CommentsList = ({ comments }) => {

    const renderCommentsHeader = () => {
        switch (comments.length) {
            case 0:
                return "No comments"
            case 1:
                return "1 comment"
            default:
                return `${comments.length} comments`
        }
    }

    const formatCreateDate = createdAt => {
        const date = createdAt.split('T')[0];
        // const time = createdAt.split('T')[1].split('.')[0];
        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];
        // const hour = time.split(':')[0];
        // const min = time.split(':')[1];
        return `${month}/${day}/${year}`;
    };

    const renderComments = () => {
        if (comments) {
            return comments.map(comment => {
                const idx = Math.floor(Math.random() * avatars.length);
                const avatar = avatars.find(a => avatars.indexOf(a) === idx);
                const slug = comment.user.username.split(' ').join('');
                return (
                    <Row className="justify-content-start mb-4">
                        <List.Item className="col-10 ml-5">                   
                            {/* <Image avatar src={avatar.props.src}
                                alt={avatar.props.alt} /> */}
                            <List.Content>
                                <Row>
                                    <div className="col-10 ml-4 mb-1">
                                    <img
                                        className="mr-2"
                                        src={avatar.props.src}
                                        alt={avatar.props.alt}
                                        style={{width: '20px', height: '20px'}}
                                    />
                                    <Link to={`/users/${slug}`}>
                                        <List.Header as='a'>{comment.user.username}</List.Header>
                                    </Link>
                                    <span style={{fontSize: '0.8rem'}} className="text-muted ml-2">{formatCreateDate(comment.created_at)}</span>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-10 ml-5" style={{lineHeight: '1.6'}}>
                                    <List.Description>
                                        {comment.content}
                                    </List.Description>
                                    </div>
                                </Row>
                            </List.Content>
                        </List.Item>
                    </Row>
                );
            });
        }
    };

    return (
        <>
            <h3 style={{marginLeft: '64px'}}>{renderCommentsHeader()}</h3>
            <List divided relaxed>
                {renderComments()}
            </List>
        </>
    );
};

export default CommentsList;