import { api } from '../services/api';
import { GET_GAMES } from './types';

export const getGames = () => {
    return async (dispatch) => {
        const res1 = await api.rawg.get('/games', {
            params: {
                platforms: 7,
                ordering: '-metacritic',
                page: 1,
                page_size: 40
            }
        });
        const res2 = await api.rawg.get('/games', {
            params: {
                platforms: 7,
                ordering: '-metacritic',
                page: 2,
                page_size: 40
            }
        });
        const res3 = await api.rawg.get('/games', {
            params: {
                platforms: 7,
                ordering: '-metacritic',
                page: 3,
                page_size: 40
            }
        });
        const res4 = await api.rawg.get('/games', {
            params: {
                platforms: 7,
                ordering: '-metacritic',
                page: 4,
                page_size: 40
            }
        });
        const res5 = await api.rawg.get('/games', {
            params: {
                platforms: 7,
                ordering: '-metacritic',
                page: 5,
                page_size: 40
            }
        });
        const results = [...res1.data.results, ...res2.data.results, ...res3.data.results, ...res4.data.results, ...res5.data.results];
        dispatch({ type: GET_GAMES, payload: results });
    };
};