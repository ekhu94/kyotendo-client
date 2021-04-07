import { GET_FORUMS } from '../actions/types';

const forumsReducer = (state=[], action) => {
    switch (action.type) {
        case GET_FORUMS:
            return action.payload;
        default:
            return state;
    }
};

export default forumsReducer;