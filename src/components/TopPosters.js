import React from 'react';
import { Media } from 'react-bootstrap';
import avatars from '../assets/icons/avatars/avatarIcons';

const TopPosters = ({ forum }) => {

    const generateAvatarJsx = () => {
        let idx = Math.floor(Math.random() * avatars.length);
        const avatar = avatars[idx];
        return (
            <img
                style={{
                    width: '40px',
                    height: '40px',
                    marginRight: '15px'
                }}
                src={avatar.props.src}
                alt={avatar.props.alt}
            />
        );
    }

    const findTopUsers = () => {
        generateAvatarJsx()
        if (forum.users) {
            const {users} = forum;
            const counter = {};
            for (let user of users) {
                const {username} = user;
                counter[`${username}`] ? counter[`${username}`]++ : counter[`${username}`] = 1;
            }
            const topUsers = Object.keys(counter).sort((a, b) => counter[b] - counter[a]);
            return topUsers.slice(0, 8).map(u => {
                return (
                    <Media as="li" className="mt-4">
                        <Media.Body>
                        <div>
                            {generateAvatarJsx()}
                            <span style={{
                                    letterSpacing: '0.1rem'
                                }}
                            >
                                {u}
                            </span>
                        </div>
                        </Media.Body>
                    </Media>
                );
            });
        }
    }

    return (
        <ul className="list-unstyled">
            {findTopUsers()}
        </ul>
    );
};

export default TopPosters;