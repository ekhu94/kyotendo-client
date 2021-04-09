import { api } from '../services/api';
import { GET_USERS } from './types';

export const getUsers = () => {
    return async (dispatch) => {
        const res = await api.rails.get('/users');
        dispatch({ type: GET_USERS, payload: res.data });
    };
};