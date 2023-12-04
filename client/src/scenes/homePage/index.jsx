import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import WidgetUsuario from "scenes/widgets/WidgetUsuario";
import WidgetMeuPost from "scenes/widgets/WidgetMeuPost";
import WidgetPosts from "scenes/widgets/WidgetPosts";
import WidgetAnuncio from "scenes/widgets/WidgetAnuncio";
import WidgetListaAmigos from "scenes/widgets/WidgetListaAmigos";

const PaginaHome = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, fotoPerfil } = useSelector((state) => state.usuario);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <WidgetUsuario usuarioId={_id} fotoPerfil={fotoPerfil} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <WidgetMeuPost fotoPerfil={fotoPerfil} />
          <WidgetPosts usuarioId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <WidgetAnuncio />
            <Box m="2rem 0" />
            <WidgetListaAmigos usuarioId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PaginaHome;
