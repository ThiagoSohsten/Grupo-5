import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Amigo from "components/Amigo";
import WidgetWrapper from "components/WidgetWrapper";
import ComponenteComentario from 'components/ComponenteComentario';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const WidgetPost = ({
  postId,
  postusuarioId,
  name,
  descricao,
  localizacao,
  fotoPerfil,
  userPicturePath,
  likes,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInuserId = useSelector((state) => state.usuario._id);
  const isLiked = Boolean(likes[loggedInuserId]);
  const contadorLikes = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuarioId: loggedInuserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Amigo
        AmigoId={postusuarioId}
        name={name}
        subtitle={localizacao}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {descricao}
      </Typography>
      {fotoPerfil && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${fotoPerfil}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{contadorLikes}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography><ComponenteComentario postId={postId} /></Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>

        

      </FlexBetween>
    </WidgetWrapper>
  );
};

export default WidgetPost;
