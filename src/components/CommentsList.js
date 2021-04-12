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
                                    <img
                                        className="mr-2"
                                        src={avatar.props.src}
                                        alt={avatar.props.alt}
                                        style={{width: '20px', height: '20px'}}
                                    />
                                    <Link to={`/users/${slug}`}>
                                    <List.Header as='a'>{comment.user.username}</List.Header>
                                </Link>
                                </Row>
                                <Row>
                                    <List.Description>
                                        {comment.content}
                                    </List.Description>
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
            <h3 style={{marginLeft: '28px'}}>{renderCommentsHeader()}</h3>
            <List divided relaxed>
                {renderComments()}
            </List>
        </>
    );
};

export default CommentsList;