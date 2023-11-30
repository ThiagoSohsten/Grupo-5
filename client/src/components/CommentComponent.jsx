import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../commentsSlice.js';
const token = localStorage.getItem('token');




const CommentComponent = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {
            if (!commentText) return;
        const requestData = { postId, text: commentText };
        console.log("Enviando requisição com:", requestData);
        // Aqui você faria a chamada para a API para adicionar o comentário
        const response = await fetch(`http://localhost:3001/comments/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDgyZDAzMjYwMGZlOTVkNDk0MzBjZCIsImlhdCI6MTcwMTMzMTI3OX0.uJcNibxHJpCv8XpeLcv2g17CJCPiRnbRVMcBfMumR8c`,
            },
            body: JSON.stringify({ postId, text: commentText }),
            
        });

        if (response.ok) {
            const newComment = await response.json();
            dispatch(addComment(newComment)); // Atualize o Redux store
            setCommentText(''); // Limpa o campo de texto após o envio
        }
    } catch (error) {
        console.error('Erro ao enviar o comentário:', error);
    }
};

    return (
        <div>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escreva um comentário..."
            />
            <button onClick={handleSubmit}>Comentar</button>
        </div>
    );
};

export default CommentComponent;
