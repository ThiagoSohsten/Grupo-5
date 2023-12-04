import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    sobrenome: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    senha: {
      type: String,
      required: true,
      min: 5,
    },
    fotoPerfil: {
      type: String,
      default: "",
    },
    amigos: {
      type: Array,
      default: [],
    },
    localizacao: String,
    ocupacao: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;