import React from 'react';
import { Media, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import avatars from '../assets/icons/avatars/avatarIcons';
import './TopPostersTop.css';

const TopPostersTop = ({ forum }) => {

    const generateAvatarJsx = idx => {
        const avatar = avatars.find(a => avatars.indexOf(a) == idx);
        if (avatar) {
            const {src, alt} = avatar.props;
            return (
                <img
                    className="avatar-icon-top d-inline d-lg-none"
                    style={{
                        marginRight: '8px'
                    }}
                    src={src}
                    alt={alt}
                />
            );
        }
    }

    const findTopUsers = () => {
        generateAvatarJsx()
        if (forum.users) {
            //* get an array of 5 random unique nums
            const idxs = [];
            while (idxs.length < 5) {
                let idx = Math.floor(Math.random() * avatars.length);
                if (!idxs.includes(idx)) {
                    idxs.push(idx);
                }
            }
            //* get the users with the most posts
            const {users} = forum;
            const counter = {};
            for (let user of users) {
                const {username} = user;
                counter[`${username}`] ? counter[`${username}`]++ : counter[`${username}`] = 1;
            }
            const topUsers = Object.keys(counter).sort((a, b) => counter[b] - counter[a]);
            return topUsers.slice(0, 5).map((u, i) => {
                return (
                    <Media as="li" className="col-10 col-md-6 pl-5 user-li mt-4">
                        <Media.Body>
                            <Link to={`/users/${u.split(' ').join('')}`}>
                                <div>
                                    {generateAvatarJsx(idxs[i])}
                                    <span className="top-user-span" style={{
                                            letterSpacing: '0.1rem'
                                        }}
                                    >
                                        {u}
                                    </span>
                                </div>
                            </Link>
                        </Media.Body>
                    </Media>
                );
            });
        }
    }

    return (
        <Row className="justify-content-center pt-5 py-4">
            <div className="col-9 d-block d-lg-none">
                <Card
                    style={{
                        borderRadius: '20px',
                        height: 'auto'
                    }}
                >
                    <h3
                        id="users-title-top"
                        className="text-center mb-3 m-0 p-3"
                        style={{
                            color: '#fff',
                            backgroundColor: 'var(--dark)',
                            textShadow: "5px 4px 6px rgba(0,0,0,0.67)",
                            letterSpacing: "0.3em",
                            lineHeight: '1.2',
                            fontSize: '1.6rem',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                            fontWeight: "500"
                        }}
                    >
                        Top 5 Users
                    </h3>
                    <div>
                        <Row className="justify-content-start">
                            {findTopUsers()}
                        </Row>
                        <Row className="justify-content-center px-0 mx-0">
                            <Button
                                variant="info"
                                className="p-3"
                                style={{
                                    borderRadius: '18px',
                                    letterSpacing: '0.25rem',
                                    marginTop: '25px',
                                    marginBottom: '25px'
                                }}
                            >
                                Create Post
                            </Button>
                        </Row>
                    </div>
                </Card>
            </div>
        </Row>
    )
};

export default TopPostersTop;