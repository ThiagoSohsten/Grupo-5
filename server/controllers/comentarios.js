import User from "../models/Usuario.js";
import Comentario from "../models/Comentario.js";

/* CREATE */
export const criarComentario = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const usuarioId = req.usuario.id;

    console.log("usuarioId recebido:", usuarioId);

    const usuario = await User.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const novoComentario = new Comentario({
      usuarioId,
      postId,
      text,
    });

    await novoComentario.save();

    
    res.status(201).json(novoComentario);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


export const getComentariosPost = async (req, res) => {
  const { postId } = req.params;
  const comentarios = await Comentario.find({ postId });
  res.json(comentarios);
};



/* READ */
export const getFeedComentarios = async (req, res) => {
  try {
    const comentario = await Comentario.find();
    res.status(200).json(comentario);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getComentariosUsuarios = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const comentario = await Comentario.find({ usuarioId });
    res.status(200).json(comentario);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};