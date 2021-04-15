import { GET_GAMES, RESET_GAMES_LIST, GET_HOME_GAMES } from '../actions/types';

const gamesReducer = (state=[], action) => {
    switch (action.type) {
        case GET_GAMES:
            return action.payload;
        case GET_HOME_GAMES:
            return action.payload;
        case RESET_GAMES_LIST:
            return [];
        default:
            return state;
    }
};

export default gamesReducer;