import User from "../models/Usuario.js";

/* READ */
export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findById(id);
    res.status(200).json(usuario);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAmigosUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findById(id);

    const amigos = await Promise.all(
      usuario.amigos.map((id) => User.findById(id))
    );
    const formattedFriends = amigos.map(
      ({ _id, nome, sobrenome, ocupacao, localizacao, fotoPerfil }) => {
        return { _id, nome, sobrenome, ocupacao, localizacao, fotoPerfil };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const adicionarRemoverAmigo = async (req, res) => {
  try {
    const { id, AmigoId } = req.params;
    const usuario = await User.findById(id);
    const amigo = await User.findById(AmigoId);

    if (usuario.amigos.includes(AmigoId)) {
      usuario.amigos = usuario.amigos.filter((id) => id !== AmigoId);
      amigo.amigos = amigo.amigos.filter((id) => id !== id);
    } else {
      usuario.amigos.push(AmigoId);
      amigo.amigos.push(id);
    }
    await usuario.save();
    await amigo.save();

    const amigos = await Promise.all(
      usuario.amigos.map((id) => User.findById(id))
    );
    const formattedFriends = amigos.map(
      ({ _id, nome, sobrenome, ocupacao, localizacao, fotoPerfil }) => {
        return { _id, nome, sobrenome, ocupacao, localizacao, fotoPerfil };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
