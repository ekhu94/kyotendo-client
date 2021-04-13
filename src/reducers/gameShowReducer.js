import { GET_GAME_SHOW, RESET_GAME_SHOW } from '../actions/types';

const gameShowReducer = (state={}, action) => {
    switch (action.type) {
        case GET_GAME_SHOW:
            return action.payload;
        case RESET_GAME_SHOW:
            return {};
        default:
            return state;
    }
};

export default gameShowReducer;