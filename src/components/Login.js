import React, { useState } from 'react';
//* React Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

import { api } from '../services/api';
import { Card, Form, Row, Button } from 'react-bootstrap';
import './Login.css';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(16).required()
});

const Login = ({ onLogin, routerProps, showAlert, renderAlert }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    // const [error, setError] = useState(false);
    // const [emailAddress, setEmailAddress] = useState('');
    // const [password, setPassword] = useState('');

    const onFormSubmit = data => {
        const newUser = {
            email_address: data.email,
            password: data.password
        };
        api.auth.login(newUser)
            .then(res => onLogin(res, routerProps));
    }

    return (
        <>
            {showAlert && renderAlert()}
            <div className="container pt-5">
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
                                // value={emailAddress}
                                // onChange={e => setEmailAddress(e.target.value)}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) => <p className="mt-2">{message}</p>}
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
                                // value={password}
                                // onChange={e => setPassword(e.target.value)}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ message }) => <p className="mt-2">{message}</p>}
                            />
                        </div>
                    </Row>
                    <Row className="justify-content-center align-items-center">
                        <Button
                            variant="dark"
                            size="lg"
                            block
                            style={{ borderRadius: '8px' }}
                            className="col-5 col-sm-4 col-lg-2 mt-4 mb-3"
                            type="submit"
                        >
                            Login
                        </Button>
                    </Row>
                </Form>
                </Card>
                </Row>
            </div>
        </>
    );
};

export default Login;