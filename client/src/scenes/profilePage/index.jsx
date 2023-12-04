import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import WidgetListaAmigos from "scenes/widgets/WidgetListaAmigos";
import WidgetMeuPost from "scenes/widgets/WidgetMeuPost";
import WidgetPosts from "scenes/widgets/WidgetPosts";
import WidgetUsuario from "scenes/widgets/WidgetUsuario";

const PaginaPerfil = () => {
  const [usuario, setUser] = useState(null);
  const { usuarioId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUsuario = async () => {
    const response = await fetch(`http://localhost:3001/users/${usuarioId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUsuario();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!usuario) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <WidgetUsuario usuarioId={usuarioId} fotoPerfil={usuario.fotoPerfil} />
          <Box m="2rem 0" />
          <WidgetListaAmigos usuarioId={usuarioId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <WidgetMeuPost fotoPerfil={usuario.fotoPerfil} />
          <Box m="2rem 0" />
          <WidgetPosts usuarioId={usuarioId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default PaginaPerfil;
