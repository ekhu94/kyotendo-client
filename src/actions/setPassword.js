import { SET_PASSWORD } from './types';

export const setPassword = password => {
    return {
        type: SET_PASSWORD,
        payload: password
    }
};