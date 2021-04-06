import { SET_USERNAME } from './types';

export const setUsername = username => {
    return {
        type: SET_USERNAME,
        payload: username
    }
};