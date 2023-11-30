// Definindo uma ação para adicionar um comentário
export const addComment = (comment) => {
    return {
        type: 'ADD_COMMENT',
        payload: comment,
    };
};

// Aqui você pode adicionar mais ações conforme necessário
