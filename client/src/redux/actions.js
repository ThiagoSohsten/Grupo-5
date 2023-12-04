// Definindo uma ação para adicionar um comentário
export const adicionarComentario = (comentario) => {
    return {
        type: 'ADICIONAR_COMENTARIO',
        payload: comentario,
    };
};

// Aqui você pode adicionar mais ações conforme necessário
