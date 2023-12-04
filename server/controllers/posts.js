import Post from "../models/Post.js";
import User from "../models/Usuario.js";

/* CREATE */
export const criarPost = async (req, res) => {
  try {
    const { usuarioId, descricao, fotoPerfil } = req.body;
    const usuario = await User.findById(usuarioId);
    const novoPost = new Post({
      usuarioId,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      localizacao: usuario.localizacao,
      descricao,
      userPicturePath: usuario.fotoPerfil,
      fotoPerfil,
      likes: {},
    });
    await novoPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPostsUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const post = await Post.find({ usuarioId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(usuarioId);

    if (isLiked) {
      post.likes.delete(usuarioId);
    } else {
      post.likes.set(usuarioId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
