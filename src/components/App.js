import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { api } from '../services/api';
import action from '../actions';
import AlertMessage from './AlertMessage';
import Auth from './Auth';
import ForumList from './ForumList';
import ForumShow from './ForumShow';
import GamesList from './GamesList';
import GameShow from './GameShow';
import HomePage from './HomePage';
import Login from './Login';
import NavBar from './NavBar';
import NewForumForm from './NewForumForm';
import NewPostForm from './NewPostForm';
import PostShow from './PostShow';
import ScrollTop from './ScrollTop';
import Signup from './Signup';
import UserPage from './UserPage';
import YoutubeVideoPlayer from './YoutubeVideoPlayer';
import { propTypes } from 'react-bootstrap/esm/Image';
import './App.css';
import { render } from '@testing-library/react';

const App = ({ auth, setAuth }) => {
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [alertObj, setAlertObj] = useState({variant:'', message:''})

    useEffect(() => {
        const token = localStorage.token;
        if (token) {
            api.auth.getCurrentUser()
            //? Need to change this
            .then(data => setAuth({
                id: data.user.id,
                username: data.user.username
            })
        )};
    }, []);

    useEffect(()=>{
        let delay = alertObj.variant==='danger' ? 10000 : 5000
        let timer = setTimeout(() => setShowAlert(false),delay)
        return ()=>{
            clearTimeout(timer)
        }
    },[alertObj]);

    const onLogin = (data, routerProps) => {
        //! authorization to make sure this is a user
        if (data.jwt){
            localStorage.setItem("token", data.jwt);
            setAuth({
                id: data.user.id,
                username: data.user.username
            });
            setAlertObj({
                variant: 'success',
                message: `Welcome back, ${data.user.username}!`
            })
            setShowAlert(true)
            setTimeout(() => {
                routerProps.history.push('/');
            }, 1000);
        } else {
            setAlertObj({
                variant: 'danger',
                message: data.message
            })
            setShowAlert(true)
        }
    };

    const onSignup = ( data, routerProps ) => {
        if (data.jwt){
            localStorage.setItem("token", data.jwt);
            setAuth({
                id: data.id,
                username: data.username
            });
            setAlertObj({
                variant: 'success',
                message: 'Registration complete. Welcome to Kyotendo!'
            })
            setShowAlert(true)
            setTimeout(() => {
                routerProps.history.push('/');
            }, 1000);
        } else {
            setAlertObj({
                variant: 'danger',
                message: data.error
            })
            setShowAlert(true)
        }
    };

    const renderAlert = () =>{
        return <AlertMessage variant={alertObj.variant} message={alertObj.message} />
    }

    const onLogout = () => {
        setAlertObj({
            variant: 'success',
            message: `Log out successful. See you again soon, ${auth.user.username}!`
        })
        setShowAlert(true)
        localStorage.removeItem('token');
        setAuth({});
        // setTimeout(() => {
        //     setShowModal(false);
        // }, 1000);
    };

    const onNewPost = (forumSlug, routerProps) => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            routerProps.history.push(`/forums/${forumSlug}`);
        }, 2000);
    };

    const onNewForum = (data, routerProps) => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            routerProps.history.push('/forums');
        }, 2000);
    };

    return (
        <div>
            <Router>
                <div className="container-fluid p-0 main-container">
                    {showAlert && renderAlert()}
                    <ScrollTop />
                    <NavBar onLogout={onLogout} showAlert={showAlert} renderAlert={renderAlert} />
                    <Route exact path="/" render={() => <HomePage /> } />
                    <Route exact path='/users/:id' render={routerProps => <UserPage userId={routerProps.match.params.id} />} />
                    <Route exact path="/new/forum" render={routerProps => <NewForumForm onNewForum={onNewForum} routerProps={routerProps} showModal={showModal} setShowModal={setShowModal} />} />
                    <Route exact path="/new/:slug/post" render={routerProps => <NewPostForm forumSlug={routerProps.match.params.slug} onNewPost={onNewPost} routerProps={routerProps} showModal={showModal} setShowModal={setShowModal} />} />
                    <Route exact path="/games" render={() => <GamesList />} />
                    <Route exact path="/games/:slug" render={routerProps => <GameShow gameSlug={routerProps.match.params.slug} />} />
                    <Route exact path="/games/:slug/videos" render={routerProps => <YoutubeVideoPlayer gameSlug={routerProps.match.params.slug} />} />
                    <Route exact path="/forums" render={() => <ForumList />} />
                    <Route
                        exact path="/forums/:slug"
                        render={routerProps => {
                            return <ForumShow forumSlug={routerProps.match.params.slug} />                      
                        }
                    } 
                    />
                    <Route
                        exact path="/forums/:slug/:postId"
                        render={routerProps => {
                            return <PostShow postId={routerProps.match.params.postId} />
                        }
                    }
                    />
                    <Route path="/auth" render={() => <Auth />} />
                    <Route path="/signup" render={routerProps => <Signup onSignup={onSignup} routerProps={routerProps} showAlert={showAlert} renderAlert={renderAlert} />} />
                    <Route path="/login" render={routerProps => <Login onLogin={onLogin} routerProps={routerProps} showAlert={showAlert} renderAlert={renderAlert} />} />
                </div>
            </Router>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const { setAuth } = action.auth;

export default connect(mapStateToProps, { setAuth })(App);