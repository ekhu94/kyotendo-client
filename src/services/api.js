import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/api/v1';
const RAWG_URL = 'https://api.rawg.io/api';
const RAWG_KEY = 'd5d3cad50e40425c9b9396d6908858b3';
const YOUTUBE_KEY = 'AIzaSyChpw7dHcvd8QHTRPK_0tov0jNfYYxb0fM';

const token = () =>  localStorage.getItem('token');

const headers = () => {
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token()
    };
};

const signup = data => {
    return fetch(`${BACKEND_URL}/users`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
            user: data
        })
    })
    .then(res => res.json())
};

const login = data => {
    return fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data)
    })
    .then(res => res.json())
};

const getCurrentUser = () => {
    return fetch(`${BACKEND_URL}/profile`, {
        headers: headers()
    })
    .then(res => res.json());
};

const postForum = async forum => {
    return await rails.post('/forums', forum);
}

const createPost = async post => {
    return await rails.post('/posts', post);
}

const createComment = async comment => {
    return await rails.post('/comments', comment);
}

const saveGame = async game => {
    return await rails.post('/games', game);
}

const deleteGame = async id => {
    return await rails.delete(`/games/${id}`);
}

const saveVideo = async video => {
    return await rails.post('/videos', video);
}

const deleteVideo = async id => {
    return await rails.delete(`/videos/${id}`);
}

const rails = axios.create({
    baseURL: BACKEND_URL
});

const rawg = axios.create({
    baseURL: RAWG_URL,
    key: RAWG_KEY
});

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 10,
        key: YOUTUBE_KEY,
        type: 'video'
    }
});

export const api = {
    rawg,
    rails,
    youtube,
    auth: {
        signup,
        login,
        getCurrentUser
    },
    forum: {
        postForum
    },
    post: {
        createPost
    },
    comment: {
        createComment
    },
    game: {
        saveGame,
        deleteGame
    },
    video: {
        saveVideo,
        deleteVideo
    }
};