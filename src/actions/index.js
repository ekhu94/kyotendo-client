//* EXTERNAL API
import { getGames } from './getGames';
//* RAILS API
import { getForums } from './getForums';
import { getForumShow } from './getForumShow';
import { resetForumShow } from './resetForumShow';
import { getUsers } from './getUsers';
//* LOCAL
import { setAuth } from './setAuth';
import { setPostIdx } from './setPostIdx';
import { resetPostIdx } from './resetPostIdx';
import { setComments } from './setComments';

const action = {
    games: {
        getGames
    },
    forums: {
        getForums,
        getForumShow,
        resetForumShow
    },
    posts: {
        setPostIdx,
        resetPostIdx
    },
    comments: {
        setComments
    },
    users: {
        getUsers
    },
    auth: {
        setAuth
    }
};

export default action;