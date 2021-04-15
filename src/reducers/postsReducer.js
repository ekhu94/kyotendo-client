import { GET_HOME_POSTS } from '../actions/types';

const postsReducer = (state=[], action) => {
    switch (action.type) {
        case GET_HOME_POSTS:
            return action.payload;
        default:
            return state;
    }
};

export default postsReducer;