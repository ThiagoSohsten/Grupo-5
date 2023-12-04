import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAmigos } from "state";
import FlexBetween from "./FlexBetween";
import ImagemUsuario from "./ImagemUsuario";

const Amigo = ({ AmigoId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.usuario);
  const token = useSelector((state) => state.token);
  const amigos = useSelector((state) => state.usuario.amigos);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isAmigo = amigos.find((amigos) => amigos._id === AmigoId);

  const patchAmigo = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${AmigoId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setAmigos({ amigos: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <ImagemUsuario image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${AmigoId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchAmigo()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isAmigo ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Amigo;
