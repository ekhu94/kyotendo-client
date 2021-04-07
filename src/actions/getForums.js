import { api } from '../services/api';
import { GET_FORUMS } from './types';

export const getForums = () => {
    return async (dispatch) => {
        const res = await api.rails.get('/forums');
        dispatch({ type: GET_FORUMS, payload: res.data });
    };
};