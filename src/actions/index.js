import { getGames } from './getGames';
import { setAuth } from './setAuth';

const action = {
    getGames,
    auth: {
        setAuth
    }
};

export default action;