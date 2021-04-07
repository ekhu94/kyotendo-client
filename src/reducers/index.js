import { combineReducers } from 'redux';

//* EXTERNAL API

//* RAILS API
import forumsReducer from './forumsReducer';

//* LOCAL
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    forums: forumsReducer
});