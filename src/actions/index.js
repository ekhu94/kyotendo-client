//* EXTERNAL API
import { getGames } from './getGames';
//* RAILS API
import { getForums } from './getForums';
//* LOCAL
import { setAuth } from './setAuth';

const action = {
    games: {
        getGames
    },
    forums: {
        getForums
    },
    auth: {
        setAuth
    }
};

export default action;