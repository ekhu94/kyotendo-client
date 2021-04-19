import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import action from "../actions";
//* React Form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";

import { Container, Row, Card, Form, Button } from "react-bootstrap";
import { Label } from "semantic-ui-react";
import { api } from "../services/api";
import "./NewPostForm.css";
import backgroundImg from "../assets/mariokart-2.jpg";
import AlertModal from "./AlertModal";
import BackButton from "./BackButton";
import PageLoader from "./PageLoader";

const schema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
});

const NewPostForm = ({
  post,
  getPostShow,
  postId,
  forumSlug,
  onUpdatePost,
  routerProps,
  showModal,
  setShowModal,
}) => {
  useEffect(() => {
    getPostShow(postId);
  }, []);

  // useEffect(() => {
  //     if (forums && forums.length) {
  //         const selected = forums.find(f => f.slug === forumSlug);
  //         getForumShow(selected.id)
  //     }

  //     return () => resetForumShow();
  // }, [forums]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const renderTypeButtons = () => {
  //     return (
  //         <ButtonGroup size="sm" className="mb-4">
  //             <Button className="px-3 btn-type-img" variant="outline-info" onClick={() => setTypeChoice('image')}>Image</Button>
  //             <Button className="px-3 btn-type-disc" variant="outline-danger" onClick={() => setTypeChoice('discussion')}>Discussion</Button>
  //             <Button className="px-3 btn-type-vid" variant="outline-success" onClick={() => setTypeChoice('video')}>Video</Button>
  //         </ButtonGroup>
  //     );
  // };

  const renderForm = () => {
    if (post && post.post_type) {
      switch (post.post_type) {
        case "":
          return null;
        case "discussion":
          return (
            <>
              <Row className="justify-content-center">
                <div className="col-10 col-md-8 my-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Post title..."
                    defaultValue={post.title}
                    {...register("title")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => (
                      <Label
                        basic
                        color="red"
                        pointing
                        className="mt-2 text-danger"
                      >
                        {message}
                      </Label>
                    )}
                  />
                </div>
              </Row>
              <Row className="justify-content-center">
                <div className="col-10 col-md-8 my-3">
                  <textarea
                    className="form-control"
                    placeholder="Content..."
                    name="content"
                    defaultValue={post.content_text}
                    rows="10"
                    {...register("content")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="content"
                    render={({ message }) => (
                      <Label
                        basic
                        color="red"
                        pointing
                        className="mt-2 text-danger"
                      >
                        {message}
                      </Label>
                    )}
                  />
                </div>
              </Row>
              <Row className="justify-content-center">
                <Button
                  id="create-new-post-btn"
                  variant="primary"
                  size="lg"
                  block
                  style={{ borderRadius: "18px" }}
                  className="auth-btn col-7 col-sm-6 col-md-5 mt-4 mb-3"
                  type="submit"
                >
                  Update Post
                </Button>
              </Row>
            </>
          );
        case "image":
          return (
            <>
              <Row className="justify-content-center">
                <div className="col-10 col-md-8 my-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Post title..."
                    defaultValue={post.title}
                    {...register("title")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => (
                      <Label
                        basic
                        color="red"
                        pointing
                        className="mt-2 text-danger"
                      >
                        {message}
                      </Label>
                    )}
                  />
                </div>
              </Row>
              <Row className="justify-content-center">
                <div className="col-10 col-md-8 my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Image URL..."
                    name="content"
                    defaultValue={post.content_url}
                    {...register("content")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="content"
                    render={({ message }) => (
                      <Label
                        basic
                        color="red"
                        pointing
                        className="mt-2 text-danger"
                      >
                        {message}
                      </Label>
                    )}
                  />
                </div>
              </Row>
              <Row className="justify-content-center">
                <Button
                  id="create-new-post-btn"
                  variant="primary"
                  size="lg"
                  block
                  style={{ borderRadius: "18px" }}
                  className="auth-btn col-7 col-sm-6 col-md-5 mt-4 mb-3"
                  type="submit"
                >
                  Update Post
                </Button>
              </Row>
            </>
          );
        case "video":
          return (
            <>
              <Row className="justify-content-center">
                <div className="col-10 col-md-8 my-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Post title..."
                    defaultValue={post.title}
                    {...register("title")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => (
                      <Label
                        basic
                        color="red"
                        pointing
                        className="mt-2 text-danger"
                      >
                        {message}
                      </Label>
                    )}
                  />
                </div>
              </Row>
              <Row className="justify-content-center">
                <div className="col-10 col-md-8 my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Video URL..."
                    name="content"
                    defaultValue={post.content_url}
                    {...register("content")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="content"
                    render={({ message }) => (
                      <Label
                        basic
                        color="red"
                        pointing
                        className="mt-2 text-danger"
                      >
                        {message}
                      </Label>
                    )}
                  />
                </div>
              </Row>
              <Row className="justify-content-center">
                <Button
                  id="create-new-post-btn"
                  variant="primary"
                  size="lg"
                  block
                  style={{ borderRadius: "18px" }}
                  className="auth-btn col-7 col-sm-6 col-md-5 mt-4 mb-3"
                  type="submit"
                >
                  Update Post
                </Button>
              </Row>
            </>
          );
      }
    }
  };

  const onFormSubmit = (data, e) => {
    console.log(data);
    console.log(post.id);
    if (post.post_type === "discussion") {
      const updatedDiscPost = {
        title: data.title,
        content_text: data.content,
      };
      api.post
        .updatePost(post.id, updatedDiscPost)
        .then((res) => onUpdatePost(post.id, forumSlug, routerProps));
    } else if (post.post_type === "image") {
      const updatedImgPost = {
        title: data.title,
        content_url: data.content,
        post_type: "image",
      };
      api.post
        .updatePost(post.id, updatedImgPost)
        .then((res) => onUpdatePost(post.id, forumSlug, routerProps));
    } else if (post.post_type === "video") {
      const updatedVidPost = {
        title: data.title,
        content_url: data.content,
      };
      api.post
        .updatePost(updatedVidPost)
        .then((res) => onUpdatePost(post.id, forumSlug, routerProps));
    } else {
      return;
    }
  };

  const postUpdateSuccessMsgs = {
    header: "Post Updated!",
    body: `Congrats! Your post has been successfully updated!!`,
  };

  return (
    <>
      <div
        className="new-forum-container"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          paddingBottom: "90px",
        }}
      >
        {post && post.forum ? (
          <Container>
            <Row className="justify-content-center">
              <Card
                id="new-post-card"
                className="px-0 pb-5 col-10 col-md-8"
                style={{ borderRadius: "20px" }}
              >
                <div>
                  <h1 className="form-headers text-center py-3 mb-3">
                    {post.forum.name}
                  </h1>
                  <div className="ml-2">
                    <BackButton
                      label={`back to ${forumSlug}`}
                      url={`/forums/${forumSlug}`}
                    />
                  </div>
                  <h3 className="form-headers text-center mt-1 mb-3">
                    Edit Post Form
                  </h3>
                </div>
                {/* <Row className="justify-content-center">
                                    <div className="col-12 col-md-10 text-center">
                                        {renderTypeButtons()}
                                    </div>
                                </Row> */}
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                  {renderForm()}
                </Form>
              </Card>
            </Row>
            <AlertModal
              showModal={showModal}
              setShowModal={setShowModal}
              messages={postUpdateSuccessMsgs}
            />
          </Container>
        ) : (
          <PageLoader />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    post: state.post,
  };
};

const { getPostShow } = action.posts;

export default connect(mapStateToProps, { getPostShow })(NewPostForm);
