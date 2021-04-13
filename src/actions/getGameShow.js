import { GET_GAME_SHOW } from './types';
import { api } from '../services/api';

export const getGameShow = slug => {
    return async (dispatch) => {
        const res = await api.rawg.get('/games', {
            params: {
                platforms: 7,
                page_size: 1,
                search: slug
            }
        });
        dispatch({ type: GET_GAME_SHOW, payload: res.data.results[0] })
    };
};