import React, { useState } from 'react';
//* React Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

import { Container, Row, Card, Form, Button } from 'react-bootstrap';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { api } from '../services/api';
import './NewForumForm.css';
import backgroundImg from '../assets/Splatoon-wallpaper-2.jpg';
import AlertModal from './AlertModal';
import BackButton from './BackButton';

const schema = yup.object().shape({
    name: yup.string().required(),
});

const NewForumForm = ({ onNewForum, routerProps, showModal, setShowModal }) => {

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onFormSubmit = (data, e) => {
        e.target.reset();
        const slug = data.name.split(' ').join('');
        const newForum = {
            name: data.name,
            slug: slug
        }
        api.forum.postForum(newForum)
            .then(res => onNewForum(res.data, routerProps));
    };

    const forumCreateSuccessMsgs = {
        header: "New Forum Created!",
        body: "Congrats! Your forum is now on Kyotendo!"
    }

    return (
        <>
            <div className="new-forum-container" style={{backgroundImage: `url(${backgroundImg})`, paddingBottom: '90px'}}>
                <Container>
                    <Row className="justify-content-center">
                    <Card id="new-forum-card" className="p-0 pb-4 col-10 col-md-8 col-lg-7" style={{ borderRadius: '20px' }}>
                    <h1 id="new-forum-header" className="mb-4 py-4 px-1 text-center" style={{letterSpacing: '0.5rem'}}>Start a New Community!</h1>
                    <div className="ml-2">
                        <BackButton label="back to all forums" />
                    </div>
                    <Form onSubmit={handleSubmit(onFormSubmit)}>
                        <Row className="justify-content-center">
                            <div className="col-8 col-md-7 my-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Forum name..."
                                    {...register("name")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <Button
                                id="create-new-forum-btn"
                                variant="primary"
                                size="lg"
                                block
                                style={{ borderRadius: '18px' }}
                                className="auth-btn col-7 col-sm-6 col-md-5 mt-4 mb-3"
                                type="submit"
                            >
                                Create Forum
                            </Button>
                        </Row>
                    </Form>
                    </Card>
                    </Row>
                    <AlertModal messages={forumCreateSuccessMsgs} showModal={showModal} setShowModal={setShowModal}/>
                </Container>
            </div>
        </>
    )
};

export default NewForumForm;