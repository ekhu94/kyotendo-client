import { SET_POST_IDX } from '../actions/types';

const postIdxReducer = (state=15, action) => {
    switch (action.type) {
        case SET_POST_IDX:
            return state + 15;
        default:
            return state;
    }
};

export default postIdxReducer;