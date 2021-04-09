import React, { useState } from 'react';
//* React Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Container, Card, Form, Row, Button } from 'react-bootstrap';
import backgroundImg from '../assets/pro-controller.jpg';
import './Login.css';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(16).required()
});

const Login = ({ onLogin, routerProps, showAlert, renderAlert }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onFormSubmit = data => {
        const newUser = {
            email_address: data.email,
            password: data.password
        };
        api.auth.login(newUser)
            .then(res => onLogin(res, routerProps))
    }

    return (
        <>
            {showAlert && renderAlert()}
            <div className="auth-page-container" style={{backgroundImage: `url(${backgroundImg})`}}>
                <Container>
                    <Row className="justify-content-center">
                    <Card className="pt-5 pb-4 col-8" style={{ borderRadius: '20px' }}>
                    <h1 className="mb-4 text-center" style={{letterSpacing: '0.5rem'}}>Kyotendo Login</h1>
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <Row className="justify-content-center align-items-center">
                            <div className="col-10 col-md-7 my-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email Address"
                                    {...register("email")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ message }) => <p className="mt-2 text-danger">{message}</p>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center align-items-center">
                            <div className="col-10 col-md-7 my-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    {...register("password")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ message }) => <p className="mt-2 text-danger">{message}</p>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center align-items-center">
                            <Button
                                variant="primary"
                                size="lg"
                                block
                                style={{ borderRadius: '18px' }}
                                className="auth-btn col-6 col-sm-4 col-lg-3 mt-4 mb-3"
                                type="submit"
                            >
                                Login
                            </Button>
                        </Row>
                        <Row className="justify-content-center">
                            <Link to="/signup" exact>
                                <div style={{color: 'var(--blue-secondary)'}} className="text-center">New User?</div>                              
                            </Link>
                        </Row>
                    </Form>
                    </Card>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Login;