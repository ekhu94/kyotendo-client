import { getGames } from './getGames';
import { setAuth } from './setAuth';
import { setUsername } from './setUsername';
import { setEmailAddress } from './setEmailAddress';
import { setPassword } from './setPassword';
import { setPasswordConfirm } from './setPasswordConfirm';

const action = {
    getGames,
    auth: {
        setAuth,
        setUsername,
        setEmailAddress,
        setPassword,
        setPasswordConfirm
    }
};

export default action;