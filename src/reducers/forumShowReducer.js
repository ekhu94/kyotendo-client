import { GET_FORUM_SHOW } from '../actions/types';

const forumShowReducer = (state={}, action) => {
    switch (action.type) {
        case GET_FORUM_SHOW:
            return action.payload;
        default:
            return state;
    }
};

export default forumShowReducer;