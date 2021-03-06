import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
//* React Form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

import { Container, Row, Card, Form, Button, ButtonGroup } from 'react-bootstrap';
import { Label } from 'semantic-ui-react';
import { api } from '../services/api';
import './NewPostForm.css';
import backgroundImg from '../assets/mariokart-2.jpg';
import AlertModal from './AlertModal';
import BackButton from './BackButton';

const schema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required()
});

const NewPostForm = ({ auth, forumSlug, forums, getForums, forum, getForumShow, onNewPost, routerProps, showModal, setShowModal }) => {

    useEffect(() => {
        getForums();
    }, []);

    useEffect(() => {
        if (forums && forums.length) {
            const selected = forums.find(f => f.slug === forumSlug);
            getForumShow(selected.id)
        }

        return () => resetForumShow();
    }, [forums]);

    const [typeChoice, setTypeChoice] = useState(''); 

    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const renderTypeButtons = () => {
        return (
            <ButtonGroup size="sm" className="mb-4">
                <Button className="px-3 btn-type-img" variant="outline-info" onClick={() => setTypeChoice('image')}>Image</Button>
                <Button className="px-3 btn-type-disc" variant="outline-danger" onClick={() => setTypeChoice('discussion')}>Discussion</Button>
                <Button className="px-3 btn-type-vid" variant="outline-success" onClick={() => setTypeChoice('video')}>Video</Button>
            </ButtonGroup>
        );
    };

    const renderForm = () => {
        switch (typeChoice) {
            case '':
                return null;
            case 'discussion':
                return (
                    <>
                        <h2 className="form-headers text-center mt-5 mb-4">Discussion Post</h2>
                        <Row className="justify-content-center">
                            <div className="col-10 col-md-8 my-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Post title..."
                                    {...register("title")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="title"
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <div className="col-10 col-md-8 my-3">
                                <textarea
                                    className="form-control"
                                    placeholder="Content..."
                                    name="content"
                                    rows="10"
                                    {...register("content")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="content"
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <Button
                                id="create-new-post-btn"
                                variant="primary"
                                size="lg"
                                block
                                style={{ borderRadius: '18px' }}
                                className="auth-btn col-7 col-sm-6 col-md-5 mt-4 mb-3"
                                type="submit"
                            >
                                Create Post
                            </Button>
                        </Row>
                    </>
                );
            case 'image':
                return (
                    <>
                        <h2 className="form-headers text-center mt-5 mb-4">Image Post</h2>
                        <Row className="justify-content-center">
                            <div className="col-10 col-md-8 my-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Post title..."
                                    {...register("title")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="title"
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
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
                                    {...register("content")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="content"
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <Button
                                id="create-new-post-btn"
                                variant="primary"
                                size="lg"
                                block
                                style={{ borderRadius: '18px' }}
                                className="auth-btn col-7 col-sm-6 col-md-5 mt-4 mb-3"
                                type="submit"
                            >
                                Create Post
                            </Button>
                        </Row>
                    </>
                );
            case 'video':
                return (
                    <>
                        <h2 className="form-headers text-center mt-5 mb-4">Video Post</h2>
                        <Row className="justify-content-center">
                            <div className="col-10 col-md-8 my-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Post title..."
                                    {...register("title")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="title"
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
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
                                    {...register("content")}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="content"
                                    render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
                                />
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <Button
                                id="create-new-post-btn"
                                variant="primary"
                                size="lg"
                                block
                                style={{ borderRadius: '18px' }}
                                className="auth-btn col-7 col-sm-6 col-md-5 mt-4 mb-3"
                                type="submit"
                            >
                                Create Post
                            </Button>
                        </Row>
                    </>
                );
        }
    };

    const onFormSubmit = (data, e) => {
        e.target.reset();
        if (typeChoice === 'discussion') {
            const newDiscPost = {
                title: data.title,
                content_text: data.content,
                post_type: 'discussion',
                upvotes: 0,
                user_id: auth.user.id,
                forum_id: forum.id
            };
            api.post.createPost(newDiscPost)
                .then(res => onNewPost(forumSlug, routerProps));
        } else if (typeChoice === 'image') {
            const newImgPost = {
                title: data.title,
                content_url: data.content,
                post_type: 'image',
                upvotes: 0,
                user_id: auth.user.id,
                forum_id: forum.id
            };
            api.post.createPost(newImgPost)
                .then(res => onNewPost(forumSlug, routerProps));
        } else if (typeChoice === 'video') {
            const newVidPost = {
                title: data.title,
                content_url: data.content,
                post_type: 'video',
                upvotes: 0,
                user_id: auth.user.id,
                forum_id: forum.id
            };
            api.post.createPost(newVidPost)
                .then(res => onNewPost(forumSlug, routerProps));
        } else {
            return;
        }
    };

    const postCreateSuccessMsgs = {
        header: "New Post Created!",
        body: `Congrats! Your post was created and uploaded to ${forum.name}!`
    }

    return (
        <>
            <div className="new-forum-container" style={{backgroundImage: `url(${backgroundImg})`, paddingBottom: '90px'}}>
                <Container>
                    <Row className="justify-content-center">
                        <Card id="new-post-card" className="px-0 pb-5 col-10 col-md-8" style={{ borderRadius: '20px' }}>
                            <div>
                                <h1
                                    className="form-headers text-center py-3 mb-3"
                                >
                                    {forum.name}
                                </h1>
                                <div className="ml-2">
                                    <BackButton label={`back to ${forumSlug}`} url={`/forums/${forumSlug}`} />
                                </div>
                                <h3 className="form-headers text-center mt-1 mb-3">Choose a post type</h3>
                            </div>
                            <Row className="justify-content-center">
                                <div className="col-12 col-md-10 text-center">
                                    {renderTypeButtons()}
                                </div>
                            </Row>
                            <Form onSubmit={handleSubmit(onFormSubmit)}>
                                {renderForm()}
                            </Form>
                        </Card>
                    </Row>
                    <AlertModal showModal={showModal} setShowModal={setShowModal} messages={postCreateSuccessMsgs} />
                </Container>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        forums: state.forums,
        forum: state.forumShow
    };
}

const { setAuth, getForums, getForumShow, resetForumShow } = action.forums; 

export default connect(mapStateToProps, { setAuth, getForums, getForumShow, resetForumShow })(NewPostForm);




{/* <div className="new-forum-container" style={{backgroundImage: `url(${backgroundImg})`, paddingBottom: '90px'}}>
    <Container>
        <Row className="justify-content-center">
        <Card id="new-post-card" className="pt-5 pb-5 col-10 col-md-8 col-lg-7" style={{ borderRadius: '20px' }}>
        <h1 id="new-forum-header" className="mb-4 text-center" style={{letterSpacing: '0.5rem'}}>Make a New Post!</h1>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Row className="justify-content-center">
                <div className="col-8 col-md-7 my-4">
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Post Title"
                        {...register("name")}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => <p className="mt-2 text-danger">{message}</p>}
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
                    Create Post
                </Button>
            </Row>
        </Form>
        </Card>
        </Row>
    </Container>
</div> */}