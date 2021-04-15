import React, { useState } from 'react';
import { connect } from 'react-redux';
import action from '../actions';
import { api } from '../services/api';
//* REACT FORM
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';

import { Link } from 'react-router-dom';
import { Row, Form, Button, Fade } from 'react-bootstrap';
import { List } from 'semantic-ui-react';

const schema = yup.object().shape({
    content: yup.string().required(),
});

const CommentObject = ({ auth, comment, avatar, slug, onCommentCreate }) => {
    const [editOpen, setEditOpen] = useState(false);

    const { register, control, formState: { errors }, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const formatCreateDate = createdAt => {
        const date = createdAt.split('T')[0];
        // const time = createdAt.split('T')[1].split('.')[0];
        const year = date.split('-')[0];
        const month = date.split('-')[1];
        const day = date.split('-')[2];
        // const hour = time.split(':')[0];
        // const min = time.split(':')[1];
        return `${month}/${day}/${year}`;
    };

    const onEditFormSubmit = (data, e) => {
        e.target.reset();
        if (auth.user.id) {
            setEditOpen(false);
            const updatedComment = {
                content: data.content
            }
            api.comment.editComment(comment.id, updatedComment)
                .then(onCommentCreate);
            } 
    };

    return (
        <Row className="justify-content-start mb-4">
            <List.Item className="col-10 ml-5">                   
                {/* <Image avatar src={avatar.props.src}
                    alt={avatar.props.alt} /> */}
                <List.Content>
                    <Row>
                        <div className="col-11 ml-4 mb-1">
                        <img
                            className="mr-2"
                            src={avatar.props.src}
                            alt={avatar.props.alt}
                            style={{width: '20px', height: '20px'}}
                        />
                        <Link to={`/users/${slug}`}>
                            <List.Header as='a'>{comment.user.username}</List.Header>
                        </Link>
                        <span style={{fontSize: '0.8rem'}} className="text-muted ml-2">{formatCreateDate(comment.created_at)}</span>
                        {comment.user_id === auth.user.id ?
                            <>
                            <Button
                                variant="link"
                                className="ml-2 align-items-center"
                                aria-controls="edit-form"
                                aria-expanded={editOpen}
                                onClick={() => setEditOpen(!editOpen)}
                            >
                                edit 
                                <img style={{width: '18px'}} src="https://img.icons8.com/nolan/64/edit--v1.png"/>
                            </Button>
                            <Row className={`justify-content-center ${editOpen ? 'd-block' : 'd-none'}`}>
                                <Fade in={editOpen}>
                                    <Form id="edit-form" onSubmit={handleSubmit(onEditFormSubmit)} className="col-9 my-4">
                                        <div className="my-3">
                                            <Controller
                                                name="content"                                              
                                                control={control}
                                                defaultValue={comment.content}
                                                rules={{ required: true }}
                                                render={({ field }) => <textarea className="form-control" rows="4" {...field} />}
                                                {...register("content")}
                                            />
                                            {/* <textarea
                                                className="form-control"
                                                name="content"
                                                rows="4"
                                                
                                            /> */}
                                            <ErrorMessage
                                                errors={errors}
                                                name="content"
                                                render={({ message }) => <p className="mt-2 text-danger">{message}</p>}
                                            />
                                        </div>
                                        <Row className="justify-content-end">
                                            <Button className="mr-3 py-1 px-2 comment-btn" variant="primary" type="submit">
                                                Update Comment
                                            </Button>
                                        </Row>
                                    </Form>
                                </Fade>
                            </Row>
                            </>
                        : null }
                        </div>
                    </Row>
                    {!editOpen ?
                        <Row className="align-items-center">
                            <div className="col-10 ml-5" style={{lineHeight: '1.6'}}>
                                <List.Description>
                                    {comment.content}
                                </List.Description>
                            </div>
                        </Row>
                    : null }
                </List.Content>
            </List.Item>
        </Row>
    );
};

const mapStateToProps = state => {
    return { auth: state.auth }
};

export default connect(mapStateToProps)(CommentObject);