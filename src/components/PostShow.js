import React, { useState, useEffect, useHistory } from "react";
import { connect } from "react-redux";
import action from "../actions";
import {
  Container,
  Row,
  Card,
  Badge,
  Fade,
  ResponsiveEmbed,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";

import { api } from "../services/api";
import "./PostShow.css";
import avatars from "../assets/icons/avatars/avatarIcons";
import backgroundImg from "../assets/forum-background.jpg";
import BackButton from "./BackButton";
import CommentsList from "./CommentsList";
import DeleteModal from "./DeleteModal";
import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";
import NewCommentForm from "./NewCommentForm";
import NoDeleteModal from "./NoDeleteModal";
import PageLoader from "./PageLoader";
import ScrollTop from "./ScrollTop";
import UpvoteButtons from "./UpvoteButtons";

const PostShow = ({
  auth,
  postId,
  post,
  getPostShow,
  resetPostShow,
  onDeletePost,
  routerProps,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [isOpen, setIsOpen] = useState(false)
  // const [user, setUser] = useState({});

  useEffect(() => {
    getPostShow(postId);

    return () => {
      // resetPostShow();
      setLoaded(false);
      resetPostShow();
    };
  }, []);

  useEffect(() => {
    if (post.user && post.forum) {
      setTimeout(() => {
        setLoaded(true);
      }, 500);
    }
  }, [post]);

  const renderPostContent = () => {
    switch (post.post_type) {
      case "discussion":
        return (
          <>
            <Row className="justify-content-center">
              <UpvoteButtons
                postId={post.id}
                postUpvotes={post.upvotes}
                className="col-1"
                showPage={true}
              />
              <div className="col-10 post-title-show pl-2 pl-md-3">
                {renderUserLink()}
                <h4 className="d-inline mr-0">
                  {post.title}
                  <Badge
                    pill
                    style={{
                      backgroundColor: "var(--red-primary)",
                      cursor: "default",
                    }}
                    className="ml-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {post.post_type}
                  </Badge>
                </h4>
                <div
                  className="text-muted ml-0"
                  style={{ letterSpacing: "0.1rem", fontSize: "0.9rem" }}
                >
                  {formatCreateDate(post.created_at)}
                </div>
              </div>
            </Row>
            <Row className="justify-content-center my-3">
              <div className="col-10 p-2">
                {renderParagraphs(post.content_text)}
              </div>
            </Row>
          </>
        );
      case "image":
        return (
          <>
            <Row className="justify-content-center">
              <UpvoteButtons
                postId={post.id}
                postUpvotes={post.upvotes}
                className="col-1"
                showPage={true}
              />
              <div className="col-10 post-title-show pl-2 pl-md-3">
                {renderUserLink()}
                <h4 className="d-inline mr-0">
                  {post.title}
                  <Badge
                    pill
                    style={{
                      backgroundColor: "var(--blue-primary)",
                      cursor: "default",
                    }}
                    className="ml-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {post.post_type}
                  </Badge>
                </h4>
                <div
                  className="text-muted ml-0"
                  style={{ letterSpacing: "0.1rem", fontSize: "0.9rem" }}
                >
                  {formatCreateDate(post.created_at)}
                </div>
              </div>
            </Row>
            <Row className="justify-content-center my-3">
              <div id="fade-image">
                <img
                  className="post-img"
                  src={post.content_url}
                  alt={post.title}
                />
              </div>
            </Row>
          </>
        );
      case "video":
        const url = post.content_url.replace("watch?v=", "embed/");
        console.log(url);
        return (
          <>
            <Row className="justify-content-center">
              <UpvoteButtons
                postId={post.id}
                postUpvotes={post.upvotes}
                className="col-1"
                showPage={true}
              />
              <div className="col-10 post-title-show pl-2 pl-md-3">
                {renderUserLink()}
                <h4 className="d-inline mr-0">
                  {post.title}
                  <Badge
                    pill
                    style={{
                      backgroundColor: "var(--lime)",
                      cursor: "default",
                    }}
                    className="ml-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {post.post_type}
                  </Badge>
                </h4>
                <div
                  className="text-muted ml-0"
                  style={{ letterSpacing: "0.1rem", fontSize: "0.9rem" }}
                >
                  {formatCreateDate(post.created_at)}
                </div>
              </div>
            </Row>
            <Row className="justify-content-center my-3">
              <div id="fade-video" className="iframe-sizing">
                <ResponsiveEmbed aspectRatio="16by9">
                  <iframe
                    src={url}
                    allow="fullscreen"
                    title={post.title}
                    className="iframe"
                  />
                </ResponsiveEmbed>
              </div>
            </Row>
          </>
        );
      default:
        return null;
    }
  };

  const renderParagraphs = (content) => {
    const parArr = content.replace(/&amp;#x200B;/gi, "").split(/\n+/gi);
    return parArr.map((par) => {
      return <p className="mr-4">{par}</p>;
    });
  };

  const renderUserLink = () => {
    if (post && post.user) {
      const idx = Math.floor(Math.random() * avatars.length);
      const avatar = avatars.find((a) => avatars.indexOf(a) === idx);
      const slug = post.user.username.split(" ").join("");
      if (avatar) {
        return (
          <div className="user-icon">
            <span>by </span>
            <Link
              to={`/users/${post.user.id}`}
              style={{ color: "var(--blue-secondary)" }}
            >
              {slug}
            </Link>
            <img
              className="ml-2"
              src={avatar.props.src}
              alt={avatar.props.alt}
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        );
      }
    }
  };

  const onCommentCreate = () => {
    getPostShow(postId);
  };

  const onDeleteClick = () => {
    setShowModal(true);
  };

  const onPostDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const onBackClick = () => {
    setShowModal(false);
  };

  const onDeleteBackClick = () => {
    setShowDeleteModal(false);
  };

  const onDeleteConfirm = async (post) => {
    const forumSlug = post.forum.slug;
    await api.post.deletePost(post);
    setTimeout(() => {
      onDeletePost(forumSlug, routerProps);
    }, 1200);
  };

  const formatCreateDate = (createdAt) => {
    const date = createdAt.split("T")[0];
    // const time = createdAt.split('T')[1].split('.')[0];
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    // const hour = time.split(':')[0];
    // const min = time.split(':')[1];
    return `${month}/${day}/${year}`;
  };

  const postDeleteProps = {
    head: "Delete Post?",
    bodyOne: "Are you sure you want to remove this post and all its comments?",
    bodyTwo: "This action cannot be undone!",
    deleteConfirm: "Post removed from Kyotendo.",
  };

  return (
    <>
      <div
        className="post-show-container"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          paddingBottom: "90px",
        }}
      >
        {loaded ? (
          <>
            <ScrollTop />
            <Container>
              <Row className="justify-content-center">
                <Card
                  id="post-show-card"
                  className="p-0 pb-5 col-10 col-md-8"
                  style={{ borderRadius: "20px" }}
                >
                  <h1
                    id="post-show-header"
                    className="px-2 py-4 mb-4 text-center"
                    style={{ letterSpacing: "0.5rem" }}
                  >
                    {post.forum.name}
                  </h1>
                  <BackButton
                    label="back to all posts"
                    url={`/forums/${post.forum.slug}`}
                  />
                  {/* post content */}
                  {renderPostContent()}
                  {auth.user && auth.user.id === post.user.id ? (
                    <Row className="justify-content-center align-items-center mt-2">
                      <div className="col-12 col-sm-5 col-md-4 text-center mb-3 mb-sm-0">
                        <EditPostButton
                          forumSlug={post.forum.slug}
                          postId={post.id}
                        />
                      </div>
                      <div className="col-12 col-sm-5 col-md-4 text-center">
                        <DeletePostButton
                          onPostDeleteClick={onPostDeleteClick}
                        />
                      </div>
                    </Row>
                  ) : null}
                  <NewCommentForm
                    user={post.user}
                    post={post}
                    onCommentCreate={onCommentCreate}
                  />
                  {/* comment list */}
                  <CommentsList
                    comments={post.comments}
                    onCommentCreate={onCommentCreate}
                    onDeleteClick={onDeleteClick}
                  />
                </Card>
              </Row>
            </Container>
          </>
        ) : (
          <PageLoader />
        )}
      </div>
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        item={post}
        onDeleteConfirm={onDeleteConfirm}
        onBackClick={onDeleteBackClick}
        data={postDeleteProps}
      />
      <NoDeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        onBackClick={onBackClick}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
    auth: state.auth,
  };
};

const { getPostShow, resetPostShow } = action.posts;

export default connect(mapStateToProps, { getPostShow, resetPostShow })(
  PostShow
);
