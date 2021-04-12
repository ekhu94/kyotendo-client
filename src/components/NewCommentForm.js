import React, { useEffect } from 'react';
//* REACT FORM
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

import { Row, Form, Button } from 'react-bootstrap';
import { api } from '../services/api';

const schema = yup.object().shape({
    content: yup.string().required(),
});

const NewCommentForm = ({ user, post, onCommentCreate }) => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onFormSubmit = (data, e) => {
        e.target.reset();
        const newComment = {
            content: data.content,
            post_id: post.id,
            user_id: user.id
        }
        api.comment.createComment(newComment)
            .then(onCommentCreate);
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
                        render={({ message }) => <p className="mt-2 text-danger">{message}</p>}
                    />
                </div>
                <Row className="justify-content-end">
                    <Button className="mr-3 py-1 px-2" variant="primary" type="submit">
                        Comment
                    </Button>
                </Row>
            </Form>
        </Row>
    );
};

export default NewCommentForm;