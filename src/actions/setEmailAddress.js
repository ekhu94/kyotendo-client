import { SET_EMAIL } from './types';

export const setEmailAddress = email => {
    return {
        type: SET_EMAIL,
        payload: email
    }
};