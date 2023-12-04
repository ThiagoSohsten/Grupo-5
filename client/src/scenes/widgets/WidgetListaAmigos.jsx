import { Box, Typography, useTheme } from "@mui/material";
import Amigo from "components/Amigo";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAmigos } from "state";

const WidgetListaAmigos = ({ usuarioId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const amigos = useSelector((state) => state.usuario.amigos);

  const getAmigos = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${usuarioId}/amigos`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setAmigos({ amigos: data }));
  };

  useEffect(() => {
    getAmigos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Lista de Amigos
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {amigos.map((amigos) => (
          <Amigo
            key={amigos._id}
            AmigoId={amigos._id}
            name={`${amigos.nome} ${amigos.sobrenome}`}
            subtitle={amigos.ocupacao}
            userPicturePath={amigos.fotoPerfil}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default WidgetListaAmigos;
