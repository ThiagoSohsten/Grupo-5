import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const RegistroSchema = yup.object().shape({
  nome: yup.string().required("required"),
  sobrenome: yup.string().required("required"),
  email: yup.string().email("email inválido").required("required"),
  senha: yup.string().required("required"),
  localizacao: yup.string().required("required"),
  ocupacao: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("email inválido").required("required"),
  senha: yup.string().required("required"),
});

const valoresIniciaisRegistro = {
  nome: "",
  sobrenome: "",
  email: "",
  senha: "",
  localizacao: "",
  ocupacao: "",
  picture: "",
};

const valoresIniciaisLogin = {
  email: "",
  senha: "",
};

const Formulario = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegistro = pageType === "registro";

  const registro = async (values, onSubmitProps) => {
    
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("fotoPerfil", values.picture.name);

    const usuarioSalvoResponse = await fetch(
      "http://localhost:3001/auth/registro",
      {
        method: "POST",
        body: formData,
      }
    );
    const usuarioSalvo = await usuarioSalvoResponse.json();
    onSubmitProps.resetarFormulario();

    if (usuarioSalvo) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetarFormulario();
    if (loggedIn) {
      dispatch(
        setLogin({
          usuario: loggedIn.usuario,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegistro) await registro(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? valoresIniciaisLogin : valoresIniciaisRegistro}
      validationSchema={isLogin ? loginSchema : RegistroSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetarFormulario,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegistro && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nome}
                  name="nome"
                  error={
                    Boolean(touched.nome) && Boolean(errors.nome)
                  }
                  helperText={touched.nome && errors.nome}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sobrenome}
                  name="sobrenome"
                  error={Boolean(touched.sobrenome) && Boolean(errors.sobrenome)}
                  helperText={touched.sobrenome && errors.sobrenome}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.localizacao}
                  name="localizacao"
                  error={Boolean(touched.localizacao) && Boolean(errors.localizacao)}
                  helperText={touched.localizacao && errors.localizacao}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.ocupacao}
                  name="ocupacao"
                  error={
                    Boolean(touched.ocupacao) && Boolean(errors.ocupacao)
                  }
                  helperText={touched.ocupacao && errors.ocupacao}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Senha"
              type="senha"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.senha}
              name="senha"
              error={Boolean(touched.senha) && Boolean(errors.senha)}
              helperText={touched.senha && errors.senha}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "registro" : "login");
                resetarFormulario();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Não possui uma conta? Registre-se aqui."
                : "Já possui uma conta? Faça login aqui."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Formulario;
