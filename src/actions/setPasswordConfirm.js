import { SET_PASSWORD_CONFIRM } from './types';

export const setPasswordConfirm = passwordConfirm => {
    return {
        type: SET_PASSWORD_CONFIRM,
        payload: passwordConfirm
    }
};