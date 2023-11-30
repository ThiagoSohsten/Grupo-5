const initialState = {
    comments: [],
    // outros estados iniciais...
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.payload],
            };
        // Outros cases...
        default:
            return state;
    }
};

export default commentsReducer;

// Se você tiver mais de um reducer, você os combinaria com combineReducers
