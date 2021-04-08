//* EXTERNAL API
import { getGames } from './getGames';
//* RAILS API
import { getForums } from './getForums';
import { getForumShow } from './getForumShow';
//* LOCAL
import { setAuth } from './setAuth';
import { setPostIdx } from './setPostIdx';

const action = {
    games: {
        getGames
    },
    forums: {
        getForums,
        getForumShow
    },
    posts: {
        setPostIdx
    },
    auth: {
        setAuth
    }
};

export default action;