import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Usuario.js";

/* REGISTER USER */
export const registro = async (req, res) => {
  try {
    const {
      nome,
      sobrenome,
      email,
      senha,
      fotoPerfil,
      amigos,
      localizacao,
      ocupacao,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = new User({
      nome,
      sobrenome,
      email,
      senha: senhaHash,
      fotoPerfil,
      amigos,
      localizacao,
      ocupacao,
    });
    const usuarioSalvo = await novoUsuario.save();
    res.status(201).json(usuarioSalvo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email: email });
    if (!usuario) return res.status(400).json({ msg: "Usuário não existe " });

    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) return res.status(400).json({ msg: "O email e/ou a senha estão incorretos " });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
    delete usuario.senha;
    res.status(200).json({ token, usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
