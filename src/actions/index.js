//* EXTERNAL API
import { getGames } from './getGames';
//* RAILS API
import { getForums } from './getForums';
import { getForumShow } from './getForumShow';
//* LOCAL
import { setAuth } from './setAuth';
import { upvote, downvote } from './upvote';

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
    },
    vote: {
        upvote,
        downvote
    }
};

export default action;