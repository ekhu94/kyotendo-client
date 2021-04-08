//* EXTERNAL API
import { getGames } from './getGames';
//* RAILS API
import { getForums } from './getForums';
import { getForumShow } from './getForumShow';
//* LOCAL
import { setAuth } from './setAuth';
import { setPostIdx } from './setPostIdx';
import { resetPostIdx } from './resetPostIdx';

const action = {
    games: {
        getGames
    },
    forums: {
        getForums,
        getForumShow
    },
    posts: {
        setPostIdx,
        resetPostIdx
    },
    auth: {
        setAuth
    }
};

export default action;