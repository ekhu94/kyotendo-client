import { api } from "../services/api";
import { GET_HOME_GAMES } from "./types";
const RAWG_KEY = process.env.REACT_APP_RAWG_KEY;

export const getHomeGames = () => {
  return async (dispatch) => {
    const res = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 1,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    dispatch({ type: GET_HOME_GAMES, payload: res.data.results });
  };
};
