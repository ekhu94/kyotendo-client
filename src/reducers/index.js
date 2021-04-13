import { combineReducers } from 'redux';

//* EXTERNAL API
import gamesReducer from './gamesReducer';
import gameShowReducer from './gameShowReducer';

//* RAILS API
import forumsReducer from './forumsReducer';
import forumShowReducer from './forumShowReducer';
import usersReducer from './usersReducer';

//* LOCAL
import authReducer from './authReducer';
import gamePageReducer from './gamePageReducer';
import postIdxReducer from './postIdxReducer';
import postReducer from './postReducer';

export default combineReducers({
    auth: authReducer,
    games: gamesReducer,
    gameShow: gameShowReducer,
    gamePage: gamePageReducer,
    forums: forumsReducer,
    forumShow: forumShowReducer,
    users: usersReducer,
    postIdx: postIdxReducer,
    post: postReducer
});