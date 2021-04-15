import React from 'react';
//* React Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Container, Card, Form, Row, Button } from 'react-bootstrap';
import { Label } from 'semantic-ui-react';
import backgroundImg from '../assets/smash-bros-background.jpg';
import './Signup.css'
import AlertModal from './AlertModal';

const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(16).required(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null])
});

const Signup = ({ onSignup, routerProps, showModal, setShowModal }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const signupSuccessMsgs = {
        header: "Signup successful!",
        body: "Welcome to Kyotendo!"
    }

    const onFormSubmit = data => {
        const newUser = {
            username: data.username,
            email_address: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirmation
        }
        api.auth.signup(newUser)
            .then(res => onSignup(res, routerProps))
    };

    return (
        <>
            <div className="auth-page-container" style={{backgroundImage: `url(${backgroundImg})`, paddingBottom: '90px'}}>
                <Container>
                    <Row className="justify-content-center">
                    <Card className="px-0 pb-4 col-10 col-md-8" style={{ borderRadius: '20px' }}>
                    <h1 className="signup-header py-4 mb-4 text-center" style={{letterSpacing: '0.5rem'}}>Kyotendo Sign Up</h1>
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <Row className="justify-content-center">
                            <div className="col-10 col-md-7 my-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Username"
                                    {...register("username")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="username"
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center">
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
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
                                />
                            </div>
                            </Row>
                        <Row className="justify-content-center">
                            <div className="col-10 col-md-7 my-3">
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    {...register("password")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <div className="col-10 col-md-7 my-3">
                                <input
                                    className="form-control"
                                    type="password"
                                    name="passwordConfirmation"
                                    placeholder="Confirm Password"
                                    {...register("passwordConfirmation")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="passwordConfirmation"
                                    render={() => <Label basic color="red" pointing className="mt-2 text-danger">passwords must match</Label>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <Button
                                variant="primary"
                                size="lg"
                                block
                                style={{ borderRadius: '18px' }}
                                className="auth-btn col-8 col-sm-6 col-md-5 mt-4 mb-3"
                                type="submit"
                            >
                                Create Account
                            </Button>
                        </Row>
                        <Row className="justify-content-center">
                            <Link to="/login" exact>
                                <div style={{color: 'var(--red-secondary)'}} className="text-center">Returning User?</div>                              
                            </Link>
                        </Row>
                    </Form>
                    </Card>
                    </Row>
                    <AlertModal messages={signupSuccessMsgs} showModal={showModal} setShowModal={setShowModal}/>
                </Container>
            </div>
        </>
    );
};

export default Signup;