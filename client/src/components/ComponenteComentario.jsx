import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adicionarComentario } from '../commentsSlice.js';




const ComponenteComentario = ({ postId }) => {
    const [textComentario, setTextComentario] = useState('');
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const handleSubmit = async () => {
        try {
            if (!textComentario) return;
        const requestData = { postId, text: textComentario };
        console.log("Enviando requisição com:", requestData);
        
        const response = await fetch(`http://localhost:3001/comentarios/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ postId, text: textComentario }),
            
        });

        if (response.ok) {
            const novoComentario = await response.json();
            dispatch(adicionarComentario(novoComentario)); // Atualize o Redux store
            setTextComentario(''); // Limpa o campo de texto após o envio
        }
    } catch (error) {
        console.error('Erro ao enviar o comentário:', error);
    }
};

    return (
        <div>
            <textarea
                value={textComentario}
                onChange={(e) => setTextComentario(e.target.value)}
                placeholder="Escreva um comentário..."
            />
            <button onClick={handleSubmit}>Comentar</button>
        </div>
    );
};

export default ComponenteComentario;
