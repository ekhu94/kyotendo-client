const authReducer = (state={ user: {} }, action) => {
    switch (action.type) {
        case 'SET_USER_AUTH':
            return {...state, user: action.payload};
        default:
            return state;
    }
};

export default authReducer;