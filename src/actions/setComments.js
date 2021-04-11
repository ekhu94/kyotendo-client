import { api } from '../services/api';
import { SET_COMMENTS } from './types';

export const setComments = comments => {
    return {
        type: SET_COMMENTS,
        payload: comments
    };
};