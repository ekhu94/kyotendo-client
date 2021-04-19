import { GET_GAME_SHOW } from "./types";
import { api } from "../services/api";
const RAWG_KEY = process.env.REACT_APP_RAWG_KEY;

export const getGameShow = (slug) => {
  return async (dispatch) => {
    const query = slug.split("-").join(" ");
    const res = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        page_size: 1,
        search: query,
        key: RAWG_KEY,
      },
    });
    dispatch({ type: GET_GAME_SHOW, payload: res.data.results[0] });
  };
};
