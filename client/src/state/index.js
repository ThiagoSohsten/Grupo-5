import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  usuario: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.usuario = action.payload.usuario;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.usuario = null;
      state.token = null;
    },
    setAmigos: (state, action) => {
      if (state.usuario) {
        state.usuario.amigos = action.payload.amigos;
      } else {
        console.error("usuario amigos non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setAmigos, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
