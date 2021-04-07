import { api } from '../services/api';
import { GET_FORUM_SHOW } from './types';

export const getForumShow = id => {
    return async (dispatch) => {
        const res = await api.rails.get(`/forums/${id}`);
        dispatch({ type: GET_FORUM_SHOW, payload: res.data });
    }
};