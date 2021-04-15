import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//* REACT FORM
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

import { Row, Form, Button } from 'react-bootstrap';
import { Label } from 'semantic-ui-react';
import { api } from '../services/api';
import './NewCommentForm.css';

const schema = yup.object().shape({
    content: yup.string().required(),
});

const NewCommentForm = ({ auth, user, post, onCommentCreate }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onFormSubmit = (data, e) => {
        e.target.reset();
        if (auth.user.id) {
            const newComment = {
                content: data.content,
                post_id: post.id,
                user_id: auth.user.id
            }
            api.comment.createComment(newComment)
                .then(onCommentCreate);
            } 
    };

    return (
        <Row className="justify-content-center">
            <Form onSubmit={handleSubmit(onFormSubmit)} className="col-9 my-4">
                <div className="my-3">
                    <textarea
                        className="form-control"
                        placeholder={`Let ${user.username} know what you think...`}
                        name="content"
                        rows="5"
                        {...register("content")}
                    />
                    <ErrorMessage
                        errors={errors}
                        name="content"
                        render={({ message }) => <Label basic color="red" pointing className="mt-2 text-danger">{message}</Label>}
                    />
                </div>
                <Row className="justify-content-end">
                    <Button className="mr-3 py-2 px-3 comment-btn" variant="primary" type="submit">
                        Comment
                    </Button>
                </Row>
            </Form>
        </Row>
    );
};

const mapStateToProps = state => {
    return { auth: state.auth };
};

export default connect(mapStateToProps)(NewCommentForm);