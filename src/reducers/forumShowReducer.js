import { GET_FORUM_SHOW, RESET_FORUM_SHOW } from '../actions/types';

const forumShowReducer = (state={}, action) => {
    switch (action.type) {
        case GET_FORUM_SHOW:
            return {...state, ...action.payload};
        case RESET_FORUM_SHOW:
            return {};
        default:
            return state;
    }
};

export default forumShowReducer;