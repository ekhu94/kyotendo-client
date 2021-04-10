import { SET_POST_IDX, RESET_POST_IDX } from '../actions/types';

const postIdxReducer = (state=0, action) => {
    switch (action.type) {
        case SET_POST_IDX:
            return state + 10;
        case RESET_POST_IDX:
            return 0;
        default:
            return state;
    }
};

export default postIdxReducer;