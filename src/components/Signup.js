import React, { useState } from 'react';
//* React Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';
//* CSS
import { Form, Row, Button } from 'react-bootstrap';
import { api } from '../services/api';

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(16).required(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null])
});

const Signup = ({ onSignup, routerProps, showAlert, renderAlert }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    // const [username, setUsername] = useState('');
    // const [emailAddress, setEmailAddress] = useState('');
    // const [password, setPassword] = useState('');
    // const [passwordConfirm, setPasswordConfirm] = useState('');
    const onFormSubmit = data => {
        const newUser = {
            username: data.username,
            email_address: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirmation
        }
        api.auth.signup(newUser)
            .then(res => onSignup(res, routerProps))
        //! Rerouting with routerProps has moved to onSignup in App.js
        // routerProps.history.push('/');
    };

    // const handleAuthResp = data =>{
    //     if (!data.error) {
    //         const { user, jwt } = data;
    //         setUser({user: user})
    //         localStorage.setItem('token', jwt)
    //     } else {
    //         console.log(data)
    //     }
    // }

    return (
        <>
            {/* {showAlert && renderAlert()} */}
            <div className="container pt-5">
                <h1 className="mb-3 text-center" style={{letterSpacing: '0.5rem'}}>Sign Up</h1>
                <Form onSubmit={handleSubmit(onFormSubmit)}>
                    <Row className="justify-content-center">
                        <div className="col-10 col-sm-8 col-md-5 my-3">
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Username"
                                // value={username}
                                // onChange={e => setUsername(e.target.value)}
                                {...register("username")}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="username"
                                render={({ message }) => <p className="mt-1">{message}</p>}
                            />
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                    <div className="col-10 col-sm-8 col-md-5 my-3">
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                placeholder="Email Address"
                                // value={emailAddress}
                                // onChange={e => setEmailAddress(e.target.value)}
                                {...register("email")}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) => <p className="mt-1">{message}</p>}
                            />
                        </div>
                        </Row>
                    <Row className="justify-content-center">
                        <div className="col-10 col-sm-8 col-md-5 my-3">
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Password"
                                // value={password}
                                // onChange={e => setPassword(e.target.value)}
                                {...register("password")}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ message }) => <p className="mt-1">{message}</p>}
                            />
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="col-10 col-sm-8 col-md-5 my-3">
                            <input
                                className="form-control"
                                type="password"
                                name="passwordConfirmation"
                                placeholder="Confirm Password"
                                // value={passwordConfirm}
                                // onChange={e => setPasswordConfirm(e.target.value)}
                                {...register("passwordConfirmation")}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="passwordConfirmation"
                                render={() => <p className="mt-1">passwords must match</p>}
                            />
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <Button
                            variant="dark"
                            size="lg"
                            block
                            style={{ borderRadius: '8px' }}
                            className="col-5 col-lg-3 mt-4"
                            type="submit"
                        >
                            Create <span className="d-none d-md-inline-flex">New</span> Account
                        </Button>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default Signup;