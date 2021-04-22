import React from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatars from "../assets/icons/avatars/avatarIcons";
import "./TopPosters.css";

const TopPosters = ({ forum }) => {
  const generateAvatarJsx = (idx) => {
    const avatar = avatars.find((a) => avatars.indexOf(a) == idx);
    if (avatar) {
      const { src, alt } = avatar.props;
      return (
        <img
          className="d-none d-lg-inline"
          style={{
            width: "30px",
            height: "30px",
            marginRight: "10px",
          }}
          src={src}
          alt={alt}
        />
      );
    }
  };

  const findTopUsers = () => {
    generateAvatarJsx();
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
      const { users } = forum;
      const counter = {};
      for (let user of users) {
        const { username } = user;
        counter[`${username}`]
          ? counter[`${username}`]++
          : (counter[`${username}`] = 1);
      }
      const topUsers = Object.keys(counter).sort(
        (a, b) => counter[b] - counter[a]
      );
      return topUsers.slice(0, 5).map((u, i) => {
        const userLink = forum.users.find((user) => user.id === u.id);
        return (
          <Media as="li" className="user-li mt-3">
            <Media.Body>
              <Link to={`/users/${userLink.id}`}>
                <div>
                  {generateAvatarJsx(idxs[i])}
                  <span
                    className="top-user-span"
                    style={{
                      letterSpacing: "0.1rem",
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
  };

  return <ul className="list-unstyled">{findTopUsers()}</ul>;
};

export default TopPosters;
