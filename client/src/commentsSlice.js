import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    // mais reducers podem ser adicionados aqui
  },
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
