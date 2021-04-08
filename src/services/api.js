import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000/api/v1';
const RAWG_URL = 'https://api.rawg.io/api';
const RAWG_KEY = 'd5d3cad50e40425c9b9396d6908858b3';

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

const rails = axios.create({
    baseURL: BACKEND_URL
});

const rawg = axios.create({
    baseURL: RAWG_URL,
    key: RAWG_KEY
});

export const api = {
    rawg,
    rails,
    auth: {
        signup,
        login,
        getCurrentUser
    }
};