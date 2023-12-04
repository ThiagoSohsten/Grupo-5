import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comentarios: [],
};

export const commentsSlice = createSlice({
  name: 'comentarios',
  initialState,
  reducers: {
    adicionarComentario: (state, action) => {
      state.comentarios.push(action.payload);
    },
    // mais reducers podem ser adicionados aqui
  },
});

export const { adicionarComentario } = commentsSlice.actions;

export default commentsSlice.reducer;
