//* EXTERNAL API
import { getGames } from './getGames';
//* RAILS API
import { getForums } from './getForums';
import { resetForums } from './resetForums';
import { getForumShow } from './getForumShow';
import { resetForumShow } from './resetForumShow';
import { getPostShow } from './getPostShow';
import { resetPostShow } from './resetPostShow';
import { getUsers } from './getUsers';
//* LOCAL
import { setAuth } from './setAuth';
import { setGamePage } from './setGamePage';
import { resetGamePage } from './resetGamePage';
import { setPostIdx } from './setPostIdx';
import { resetPostIdx } from './resetPostIdx';

const action = {
    games: {
        getGames,
        setGamePage,
        resetGamePage
    },
    forums: {
        getForums,
        resetForums,
        getForumShow,
        resetForumShow
    },
    posts: {
        setPostIdx,
        resetPostIdx,
        getPostShow,
        resetPostShow
    },
    users: {
        getUsers
    },
    auth: {
        setAuth
    }
};

export default action;