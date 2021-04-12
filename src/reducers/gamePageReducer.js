import { SET_GAME_PAGE, RESET_GAME_PAGE } from '../actions/types';

const gamePageReducer = (state=1, action) => {
    switch (action.type) {
        case SET_GAME_PAGE:
            return state + 1
        case RESET_GAME_PAGE:
            return 1;
        default:
            return state;
    }
};

export default gamePageReducer;