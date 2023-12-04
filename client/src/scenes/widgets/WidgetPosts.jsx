import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import WidgetPost from "./WidgetPost";

const WidgetPosts = ({ usuarioId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getPostsUsuario = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${usuarioId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getPostsUsuario();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          usuarioId,
          nome,
          sobrenome,
          descricao,
          localizacao,
          fotoPerfil,
          userPicturePath,
          likes,
        }) => (
          <WidgetPost
            key={_id}
            postId={_id}
            postusuarioId={usuarioId}
            name={`${nome} ${sobrenome}`}
            descricao={descricao}
            localizacao={localizacao}
            fotoPerfil={fotoPerfil}
            userPicturePath={userPicturePath}
            likes={likes}
          />
        )
      )}
    </>
  );
};

export default WidgetPosts;
