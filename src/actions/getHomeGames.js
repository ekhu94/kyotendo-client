import { api } from '../services/api';
import { GET_HOME_GAMES } from './types';

export const getHomeGames = () => {
    return async (dispatch) => {
        const res = await api.rawg.get('/games', {
            params: {
                platforms: 7,
                ordering: '-metacritic',
                page: 1,
                page_size: 40
            }
        });
        dispatch({ type: GET_HOME_GAMES, payload: res.data.results });
    };
};