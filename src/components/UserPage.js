import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { Container, Row, Card, Table, Button } from "react-bootstrap";
import "./UserPage.css";

import BackButton from "./BackButton";
import DeleteModal from "./DeleteModal";
import PostObject from "./PostObject";
import ProfileGameCard from "./ProfileGameCard";
import ProfileVideoRow from "./ProfileVideoRow";
import PageLoader from "./PageLoader";

import backgroundImg from "../assets/smash-bros-background.jpg";
import bowser from "../assets/icons/avatars/bowser.jpg";
import daisy from "../assets/icons/avatars/daisy.jpg";
import donkeyKong from "../assets/icons/avatars/donkey-kong.jpg";
import isabella from "../assets/icons/avatars/isabella.jpg";
import koopa from "../assets/icons/avatars/koopa.jpg";
import link from "../assets/icons/avatars/link.jpg";
import luigi from "../assets/icons/avatars/luigi.jpg";
import mario from "../assets/icons/avatars/mario.jpg";
import princessPeach from "../assets/icons/avatars/princess-peach.jpg";
import rosalina from "../assets/icons/avatars/rosalina.jpg";
import shyguy from "../assets/icons/avatars/shyguy.jpg";
import tanukiMario from "../assets/icons/avatars/tanuki-mario.jpg";
import toad from "../assets/icons/avatars/toad.jpg";
import villagerF from "../assets/icons/avatars/villager-f.jpg";
import villagerM from "../assets/icons/avatars/villager-m.jpg";
import waluigi from "../assets/icons/avatars/waluigi.jpg";
import wario from "../assets/icons/avatars/wario.jpg";
import yoshi from "../assets/icons/avatars/yoshi.jpg";

const nintendoCharacters = [
  bowser,
  daisy,
  donkeyKong,
  isabella,
  koopa,
  link,
  luigi,
  mario,
  princessPeach,
  rosalina,
  shyguy,
  tanukiMario,
  toad,
  villagerM,
  villagerF,
  waluigi,
  wario,
  yoshi,
];

const UserPage = ({ userId, auth }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [deleteVideo, setDeleteVideo] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const user = await api.rails.get(`/users/${userId}`);
        setCurrentUser(user.data);
      }
    };
    getUser();
  }, []);

  useEffect(() => {}, [currentUser]);

  const renderAvatar = () => {
    const idx = currentUser.id % nintendoCharacters.length;
    return (
      <img
        src={nintendoCharacters[idx]}
        alt="profile-avatar"
        style={{ width: "150px", borderRadius: "50%" }}
      />
    );
  };

  const formatDate = (release) => {
    if (release) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const date = release.split("T")[0].split("-");
      const year = date[0];
      const month = monthNames[parseInt(date[1]) - 1];
      const day = date[2];
      return `${month} ${day}, ${year}`;
    }
  };

  const renderGamesCollection = () => {
    if (currentUser && currentUser.games) {
      const filterGames = currentUser.games.filter((game, i) => {
        const search = currentUser.games.find((g) => g.name === game.name);
        return (
          currentUser.games.indexOf(game) === currentUser.games.indexOf(search)
        );
      });
      return filterGames.map((game, i) => {
        return (
          <ProfileGameCard
            key={game.id}
            game={game}
            idx={i}
            imgUrl={game.img_url}
          />
        );
      });
    }
  };

  const renderVideosCollection = () => {
    if (currentUser && currentUser.videos) {
      return currentUser.videos
        .sort((a, b) => a.game.title - b.game.title)
        .map((video) => {
          return (
            <ProfileVideoRow
              key={video.id}
              userId={video.user.id}
              video={video}
              onVideoDelete={onVideoDelete}
            />
          );
        });
    }
  };

  const renderUserPosts = () => {
    if (currentUser && currentUser.posts) {
      return currentUser.posts.map((post) => {
        return (
          <Row className="justify-content-start ml-2" key={post.id}>
            <PostObject post={post} pathname={`/forums/${post.forum.slug}`} />
          </Row>
        );
      });
    }
  };

  const onVideoDelete = (video) => {
    setDeleteVideo(video);
    setShowModal(true);
  };

  const onDeleteConfirm = async (video) => {
    const gameId = video.game.id;
    await api.video.deleteVideo(video.id);
    const check = await api.rails.get(`/games/${gameId}`);
    if (!check.data.videos || check.data.videos.length === 0) {
      await api.game.deleteGame(gameId);
    }
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
    const getUser = async () => {
      if (userId) {
        const user = await api.rails.get(`/users/${userId}`);
        setCurrentUser(user.data);
      }
    };
    getUser();
  };

  const onBackClick = () => {
    setShowModal(false);
  };

  const deleteVideoProps = {
    head: "Remove Video?",
    bodyOne: "Are you sure you want to delete this video from your collection?",
    bodyTwo: "This may also remove the game from your profile as well.",
    deleteConfirm: "Video removed from your profile!",
  };

  return (
    <>
      <div
        className="profile-container pt-5"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        {currentUser && currentUser.id ? (
          <Container>
            <BackButton label="back to home" url="/" />
            <Row className="justify-content-center">
              <Card
                className="col-10 col-md-11 p-0 pb-4 mb-5"
                style={{ borderRadius: "20px" }}
              >
                <h1 className="profile-header text-center py-4">
                  {currentUser.username}
                </h1>
                <Row className="justify-content-center align-items-center my-5">
                  {renderAvatar()}
                </Row>
                <h4 className="profile-sub-header text-center mt-2">
                  Joined on: {formatDate(currentUser.created_at)}
                </h4>
                <h4 className="profile-sub-header text-center mt-1">
                  Number of posts: {currentUser.posts.length}
                </h4>
                <h4 className="profile-sub-header text-center mt-1 mb-5">
                  Number of comments: {currentUser.comments.length}
                </h4>
                {currentUser.games && currentUser.games.length ? (
                  <>
                    <h3
                      style={{ letterSpacing: "0.2rem" }}
                      className="text-center mb-3"
                    >
                      Game Collection
                    </h3>
                    <Row className="justify-content-center">
                      {renderGamesCollection()}
                    </Row>
                  </>
                ) : null}
                {currentUser.videos && currentUser.videos.length ? (
                  <>
                    <h3
                      style={{ letterSpacing: "0.2rem" }}
                      className="text-center mt-5 mb-3"
                    >
                      Video Collection
                    </h3>
                    <Table size="lg" striped hover className="px-4 mb-5">
                      <thead>
                        <tr>
                          <th className="pl-1 pl-md-5">Title</th>
                          <th className="pl-1 pl-md-5">Game</th>
                          {auth.user && auth.user.id === currentUser.id ? (
                            <th className="text-center pr-1 pr-md-5">Remove</th>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>{renderVideosCollection()}</tbody>
                    </Table>
                  </>
                ) : null}
                {currentUser.posts && currentUser.posts.length ? (
                  <>
                    <h3
                      style={{ letterSpacing: "0.2rem" }}
                      className="text-center mt-4 mb-2"
                    >
                      Post Collection
                    </h3>
                    {renderUserPosts()}
                  </>
                ) : null}
              </Card>
            </Row>
          </Container>
        ) : (
          <PageLoader />
        )}
        <DeleteModal
          showModal={showModal}
          setShowModal={setShowModal}
          item={deleteVideo}
          onDeleteConfirm={onDeleteConfirm}
          onBackClick={onBackClick}
          data={deleteVideoProps}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(UserPage);
