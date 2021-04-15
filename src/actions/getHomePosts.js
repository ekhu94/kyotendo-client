import { api } from '../services/api';
import { GET_HOME_POSTS } from './types';

export const getHomePosts = () => {
    return async dispatch => {
        const res = await api.rails.get('/home');
        dispatch({ type: GET_HOME_POSTS, payload: res.data });
    };
};