import { UPVOTE, DOWNVOTE } from './types';

export const upvote = () => {
    return {
        type: UPVOTE
    };
};

export const downvote = () => {
    return {
        type: DOWNVOTE
    };
};