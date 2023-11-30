import User from "../models/User.js";
import Comment from "../models/Comment.js";

/* CREATE */
export const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    const userId = req.user.id;

    console.log("UserID recebido:", userId); // Adicione esta linha para depuração

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Agora que você tem um usuário válido e as outras informações, crie o comentário
    const newComment = new Comment({
      userId,
      postId,
      text,
    });

    await newComment.save();

    // Você pode querer retornar apenas o novo comentário em vez de todos os comentários
    res.status(201).json(newComment);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


export const getPostComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId });
  res.json(comments);
};



/* READ */
export const getFeedComments = async (req, res) => {
  try {
    const comment = await Comment.find();
    res.status(200).json(comment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserComments = async (req, res) => {
  try {
    const { userId } = req.params;
    const comment = await Comment.find({ userId });
    res.status(200).json(comment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};