//* EXTERNAL API
import { getGames } from './getGames';
//* RAILS API
import { getForums } from './getForums';
import { getForumShow } from './getForumShow';
//* LOCAL
import { setAuth } from './setAuth';

const action = {
    games: {
        getGames
    },
    forums: {
        getForums,
        getForumShow
    },
    auth: {
        setAuth
    }
};

export default action;