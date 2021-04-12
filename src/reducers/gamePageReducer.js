import { SET_GAME_PAGE, RESET_GAME_PAGE } from '../actions/types';

const gamePageReducer = (state=0, action) => {
    switch (action.type) {
        case SET_GAME_PAGE:
            return state + 20
        case RESET_GAME_PAGE:
            return 0;
        default:
            return state;
    }
};

export default gamePageReducer;