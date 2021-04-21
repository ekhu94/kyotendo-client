import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Fade, ResponsiveEmbed } from "react-bootstrap";
import { api } from "../services/api";
import "./ProfileVideoRow.css";

const ProfileVideoRow = ({
  auth,
  userId,
  video,
  onVideoDelete,
  showModal,
  setShowModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onDeleteClick = async (e) => {
    e.stopPropagation();
    onVideoDelete(video);
  };

  return (
    <>
      <tr
        className="video-row"
        aria-controls="fade-video"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <td className="py-4 pl-md-5 pl-1" style={{ lineHeight: "1.8" }}>
          {video.title}
        </td>
        <Link to={`/games/${video.game.slug}`} className="video-game-link">
          <td
            className="py-4 pl-md-5 pl-1"
            style={{ lineHeight: "1.8" }}
            onClick={(e) => e.stopPropagation()}
          >
            {video.game.name}
          </td>
        </Link>
        {auth.user && auth.user.id === userId ? (
          <td className="py-4 pr-1 pr-md-5 text-center">
            <img
              style={{ width: "30px" }}
              src="https://img.icons8.com/cotton/64/000000/delete-sign--v2.png"
              onClick={onDeleteClick}
            />
          </td>
        ) : null}
      </tr>
      <tr>
        <td
          style={{ minWidth: "100% !important" }}
          className={`${!isOpen ? "d-none" : ""}`}
          id="fade-video"
          colSpan="3"
        >
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

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(ProfileVideoRow);
