import { Box } from "@mui/material";

const ImagemUsuario = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="usuario"
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default ImagemUsuario;
