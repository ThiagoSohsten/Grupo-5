import mongoose from "mongoose";

const comentarioSchema = mongoose.Schema({
  usuarioId: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  text: String,
  },
  { timestamps: true }
);

const Comentario = mongoose.model("Comentario", comentarioSchema);

export default Comentario;
