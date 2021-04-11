import { api } from '../services/api';
import { GET_POST_SHOW } from './types';

export const getPostShow = id => {
    return async (dispatch) => {
        const res = await api.rails.get(`/posts/${id}`);
        dispatch({ type: GET_POST_SHOW, payload: res.data });
    };
};