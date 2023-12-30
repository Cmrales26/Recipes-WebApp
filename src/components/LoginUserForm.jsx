import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginUserForm = (props) => {
  const { loginUser, error } = UseUser();

  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (props.statteusername === null) {
      return;
    } else {
      setValue("username", props.statteusername);
    }
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    loginUser(values);
    console.log(values);
    Navigate("/home");
  });

  const resetform = () => {
    reset();
    props.setIsCreating(!props.isCreating);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
      className="LoginFormConainer"
      onSubmit={onSubmit}
    >
      <h3>Bienvenido de vuelta,</h3>
      <p>Inicia Sesión para Continuar</p>
      {error ? <div className="servereror">{error}</div> : null}
      <div className="formularioIniciar">
        <TextField
          required
          label="Username"
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "El nombre de usuario es requerido",
            },
            maxLength: 50,
            pattern: {
              value: /^\S+$/,
              message: "El nombre de usuario no puede contener espacios",
            },
          })}
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>

      <div className="">
        <TextField
          autoComplete="off"
          required
          label="Password"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es requerida",
            },
            maxLength: {
              value: 50,
              message: "La contraseña no puede contener mas de 50 caracteres",
            },
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
            pattern: {
              value: /^\S+$/,
              message: "La contraseña no puede contener espacios",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <div className="rememberpass">
        <Link to={"/login/forgot"}>Olvidé mi contraseña</Link>
      </div>

      <Stack spacing={1} direction="row" className="btncontainer">
        <Button className="btnlogin" type="submit" variant="contained">
          iniciar Sesión
        </Button>
      </Stack>
      <Stack spacing={1} direction="column" className="btncontainer">
        <p>¿No tienes una cuenta?</p>
        <Button
          className="btnlogin"
          type="button"
          variant="outlined"
          onClick={() => resetform()}
        >
          Crear cuenta
        </Button>
      </Stack>
    </Box>
  );
};

LoginUserForm.propTypes = {
  setIsCreating: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
};

export default LoginUserForm;
