import { GET_GAMES } from '../actions/types';

const gamesReducer = (state=[], action) => {
    switch (action.type) {
        case GET_GAMES:
            return action.payload;
        default:
            return state;
    }
};

export default gamesReducer;