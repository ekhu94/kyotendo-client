import { GET_FORUMS, RESET_FORUMS } from '../actions/types';

const forumsReducer = (state=[], action) => {
    switch (action.type) {
        case GET_FORUMS:
            return action.payload;
        case RESET_FORUMS:
            return [];
        default:
            return state;
    }
};

export default forumsReducer;