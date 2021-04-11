import { GET_POST_SHOW, RESET_POST_SHOW } from '../actions/types';

const postReducer = (state={}, action) => {
    switch (action.type) {
        case GET_POST_SHOW:
            return action.payload;
        case RESET_POST_SHOW:
            return {};
        default:
            return state;
    }
};

export default postReducer;