import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { api } from '../services/api';

import AlertMessage from './AlertMessage';
import ScrollTop from './ScrollTop';
import Signup from './Signup';

const App = () => {
    const [auth, setAuth] = useState({ user: {} });
    const [showAlert, setShowAlert] = useState(false)
    const [alertObj, setAlertObj] = useState({variant:'', message:''})

    useEffect(() => {
        const token = localStorage.token;
        if (token) {
            api.auth.getCurrentUser()
            //? Need to change this
            .then(data => setAuth({
                user: {
                    id: data.user.id,
                    fullname: data.user.fullname
                }
            })
        )};
    }, []);

    //? Need to convert to redux
    const onLogin = (data, routerProps) => {
        //! authorization to make sure this is a user
        if (data.jwt){
            localStorage.setItem("token", data.jwt);
            setAuth({
                user: {
                    id: data.user.id,
                    fullname: data.user.fullname
                }
            });
            setAlertObj({
                variant: 'success',
                message: `Welcome back, ${data.user.fullname}!`
            })
            setShowAlert(true)
            routerProps.history.push('/');
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
                user: {
                    id: data.id,
                    fullname: data.fullname
                }
            });
            setAlertObj({
                variant: 'success',
                message: 'Thanks for signing up. Welcome to FROS!'
            })
            setShowAlert(true)
            routerProps.history.push('/');
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
            message: 'User has successfully logged out.'
        })
        setShowAlert(true)
        localStorage.removeItem('token');
        setAuth({...auth, user: {}});
        window.history.pushState({}, '', '/');
        window.location.reload();
    };

    return (
        <div>
            <Router>
                <div>
                    <ScrollTop />
                    <Route path="/signup" render={routerProps => <Signup onSignup={onSignup} routerProps={routerProps} showAlert={showAlert} renderAlert={renderAlert} />} />
                </div>
            </Router>
        </div>
    );
};

export default App;