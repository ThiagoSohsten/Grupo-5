const initialState = {
    comentarios: [],
    // outros estados iniciais...
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADICIONAR_COMENTARIO':
            return {
                ...state,
                comentarios: [...state.comentarios, action.payload],
            };
        // Outros cases...
        default:
            return state;
    }
};

export default commentsReducer;

// Se você tiver mais de um reducer, você os combinaria com combineReducers
