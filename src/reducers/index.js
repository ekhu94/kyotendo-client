import { combineReducers } from 'redux';

//* EXTERNAL API

//* RAILS API
import forumsReducer from './forumsReducer';
import forumShowReducer from './forumShowReducer';
import usersReducer from './usersReducer';

//* LOCAL
import authReducer from './authReducer';
import postIdxReducer from './postIdxReducer';
import postReducer from './postReducer';

export default combineReducers({
    auth: authReducer,
    forums: forumsReducer,
    forumShow: forumShowReducer,
    users: usersReducer,
    postIdx: postIdxReducer,
    post: postReducer
});