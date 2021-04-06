import { SET_USER_AUTH } from './types';

export const setAuth = user => {
    return {
        type: SET_USER_AUTH,
        payload: user
    }
};