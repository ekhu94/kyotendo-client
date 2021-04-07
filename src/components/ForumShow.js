import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import action from '../actions';

import PageLoader from './PageLoader';

const ForumShow = ({ forumShow, getForumShow }) => {

    useEffect(() => {
        return () => {
            getForumShow({})
        }
    }, []);

    return (
        <div>
            {forumShow ?
                <div>{forumShow.name}</div>
                :
                <PageLoader />
            }
        </div>
    )
};

const mapStateToProps = state => {
    return { forumShow: state.forumShow }
};

const { getForumShow } = action.forums;

export default connect(mapStateToProps, { getForumShow })(ForumShow);