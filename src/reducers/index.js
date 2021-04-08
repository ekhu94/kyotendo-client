import { combineReducers } from 'redux';

//* EXTERNAL API

//* RAILS API
import forumsReducer from './forumsReducer';
import forumShowReducer from './forumShowReducer';

//* LOCAL
import authReducer from './authReducer';
import postIdxReducer from './postIdxReducer';

export default combineReducers({
    auth: authReducer,
    forums: forumsReducer,
    forumShow: forumShowReducer,
    postIdx: postIdxReducer
});