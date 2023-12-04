import mongoose from "mongoose";


const postSchema = mongoose.Schema(
  {
    usuarioId: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    sobrenome: {
      type: String,
      required: true,
    },
    localizacao: String,
    descricao: String,
    fotoPerfil: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
