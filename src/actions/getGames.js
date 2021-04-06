import { api } from '../services/api';

export const getGames = pageNum => {
    return async (dispatch) => {
        const res = await api.rawg.get('/games', {
            params: {
                platforms: 7,
                ordering: '-metacritic',
                page: pageNum
            }
        });
        dispatch({ type: 'GET_GAMES', payload: res.data.results });
    };
};