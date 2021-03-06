import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { api } from "../services/api";
import action from "../actions";
// import AlertMessage from "./AlertMessage";
import AlertModal from "./AlertModal";
import Auth from "./Auth";
import ErrorModal from "./ErrorModal";
import ForumList from "./ForumList";
import ForumShow from "./ForumShow";
import GamesList from "./GamesList";
import GameShow from "./GameShow";
import HomePage from "./HomePage";
import Login from "./Login";
import NavBar from "./NavBar";
import NewForumForm from "./NewForumForm";
import NewPostForm from "./NewPostForm";
import NoPage from "./NoPage";
import PostShow from "./PostShow";
import ScrollTop from "./ScrollTop";
import Signup from "./Signup";
import UpdatePostForm from "./UpdatePostForm";
import UserPage from "./UserPage";
import YoutubeVideoPlayer from "./YoutubeVideoPlayer";
import "./App.css";

const App = ({ auth, setAuth }) => {
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showLoginErrorModal, setShowLoginErrorModal] = useState(false);
  const [showSignupErrorModal, setShowSignupErrorModal] = useState(false);

  useEffect(() => {
    const token = localStorage.token;
    if (token) {
      api.auth
        .getCurrentUser()
        //? Need to change this
        .then((data) => {
          if (data) {
            setAuth({
              id: data.user.id,
              username: data.user.username,
            });
          }
        });
    }
  }, []);

  const onLogin = (data, routerProps) => {
    //! authorization to make sure this is a user
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      setAuth({
        id: data.user.id,
        username: data.user.username,
      });
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        routerProps.history.push("/");
      }, 2000);
    } else {
      setShowLoginErrorModal(true);
    }
  };

  const onLoginFailClick = () => {
    setShowLoginErrorModal(false);
  };

  const onSignup = (data, routerProps) => {
    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      setAuth({
        id: data.id,
        username: data.username,
      });
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        routerProps.history.push("/");
      }, 2000);
    } else {
      setShowSignupErrorModal(true);
    }
  };

  const onSignupFailClick = () => {
    setShowSignupErrorModal(false);
  };

  const logoutSuccessMsgs = {
    header: "Logout successful!",
    body: `Log out successful. See you again soon!`,
  };

  const loginFailureMsgs = {
    header: "Login failed!",
    body: `Something's wrong with your email or password. Please try again.`,
  };

  const signupFailureMsgs = {
    header: "Sign up failed!",
    body: `Something's wrong with your registration!. Please try again.`,
  };

  const onLogout = () => {
    setShowLogoutModal(true);
    localStorage.removeItem("token");
    setAuth({});
    setTimeout(() => {
      setShowLogoutModal(false);
      // routerProps.history.push('/');
    }, 1500);
  };

  const onNewPost = (forumSlug, routerProps) => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      // window.history.pushState({}, '', `/forums/${forumSlug}`);
      // window.location.reload();
      routerProps.history.push(`/forums/${forumSlug}`);
    }, 2000);
  };

  const onUpdatePost = (postId, forumSlug, routerProps) => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      routerProps.history.push(`/forums/${forumSlug}/${postId}`);
    }, 2000);
  };

  const onDeletePost = (forumSlug, routerProps) => {
    routerProps.history.push(`/forums/${forumSlug}`);
  };

  const onNewForum = (data, routerProps) => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      routerProps.history.push("/forums");
    }, 2000);
  };

  return (
    <div>
      <Router>
        <div className="container-fluid p-0 main-container">
          <ScrollTop />
          <NavBar onLogout={onLogout} />
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route
              exact
              path="/users/:id"
              render={(routerProps) => (
                <UserPage userId={routerProps.match.params.id} />
              )}
            />
            <Route
              exact
              path="/new/forum"
              render={(routerProps) => (
                <NewForumForm
                  onNewForum={onNewForum}
                  routerProps={routerProps}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}
            />
            <Route
              exact
              path="/new/:slug/post"
              render={(routerProps) => (
                <NewPostForm
                  forumSlug={routerProps.match.params.slug}
                  onNewPost={onNewPost}
                  routerProps={routerProps}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}
            />
            <Route
              exact
              path="/edit/:slug/:id"
              render={(routerProps) => (
                <UpdatePostForm
                  forumSlug={routerProps.match.params.slug}
                  postId={routerProps.match.params.id}
                  onUpdatePost={onUpdatePost}
                  routerProps={routerProps}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}
            />
            <Route exact path="/games" render={() => <GamesList />} />
            <Route
              exact
              path="/games/:slug"
              render={(routerProps) => (
                <GameShow gameSlug={routerProps.match.params.slug} />
              )}
            />
            <Route
              exact
              path="/games/:slug/videos"
              render={(routerProps) => (
                <YoutubeVideoPlayer gameSlug={routerProps.match.params.slug} />
              )}
            />
            <Route exact path="/forums" render={() => <ForumList />} />
            <Route
              exact
              path="/forums/:slug"
              render={(routerProps) => {
                return <ForumShow forumSlug={routerProps.match.params.slug} />;
              }}
            />
            <Route
              exact
              path="/forums/:slug/:postId"
              render={(routerProps) => {
                return (
                  <PostShow
                    postId={routerProps.match.params.postId}
                    routerProps={routerProps}
                    onDeletePost={onDeletePost}
                  />
                );
              }}
            />
            <Route path="/auth" render={() => <Auth />} />
            <Route
              path="/signup"
              render={(routerProps) => (
                <Signup
                  onSignup={onSignup}
                  routerProps={routerProps}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}
            />
            <Route
              path="/login"
              render={(routerProps) => (
                <Login
                  onLogin={onLogin}
                  routerProps={routerProps}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}
            />
            <Route component={NoPage} />
          </Switch>
          <AlertModal
            messages={logoutSuccessMsgs}
            showModal={showLogoutModal}
            setShowModal={setShowLogoutModal}
          />
          {/* login failure modal */}
          <ErrorModal
            messages={loginFailureMsgs}
            showModal={showLoginErrorModal}
            setShowModal={setShowLoginErrorModal}
            onBackClick={onLoginFailClick}
          />
          {/* signup failure modal */}
          <ErrorModal
            messages={signupFailureMsgs}
            showModal={showSignupErrorModal}
            setShowModal={setShowSignupErrorModal}
            onBackClick={onSignupFailClick}
          />
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const { setAuth } = action.auth;

export default connect(mapStateToProps, { setAuth })(App);
