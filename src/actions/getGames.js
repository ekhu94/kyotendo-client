import { api } from "../services/api";
import { GET_GAMES } from "./types";
const RAWG_KEY = process.env.REACT_APP_RAWG_KEY;

export const getGames = () => {
  return async (dispatch) => {
    const res1 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 1,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const res2 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 2,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const res3 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 3,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const res4 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 4,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const res5 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 5,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const res6 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 6,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const res7 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 7,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const res8 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 8,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const res9 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 9,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const res10 = await api.rawg.get("/games", {
      params: {
        platforms: 7,
        ordering: "-metacritic",
        page: 10,
        page_size: 40,
        key: RAWG_KEY,
      },
    });
    const results = [
      ...res1.data.results,
      ...res2.data.results,
      ...res3.data.results,
      ...res4.data.results,
      ...res5.data.results,
      ...res6.data.results,
      ...res7.data.results,
      ...res8.data.results,
      ...res9.data.results,
      ...res10.data.results,
    ];
    dispatch({ type: GET_GAMES, payload: results });
  };
};
