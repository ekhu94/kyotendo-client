import { useState, useEffect } from 'react';
import { api } from '../services/api';

const useVideos = defaultSearch => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        search(defaultSearch);
    }, [defaultSearch]);

    const search = async term => {
        const res = await api.youtube.get('/search', {
            params: {
                q: term
            }
        });
        setVideos(res.data.items);
    };

    return {videos, search};
};

export default useVideos;