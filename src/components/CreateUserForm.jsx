import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const CreateUserForm = (props) => {
  const { error, creatUser } = UseUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    const res = await creatUser(values);
    if (res != "error") {
      props.setIsSelecting(true);
    }
  });

  const resetform = () => {
    reset();
    props.setIsCreating(!props.isCreating);
  };

  const password = watch("password");

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
      <h3>Forma parte de nuestra comunidad</h3>
      <p>Crear cuenta</p>
      {error ? <div className="servereror"> {error}</div> : null}
      <div className="">
        <TextField
          required
          label="Nombre"
          type="text"
          {...register("name", {
            required: { value: true, message: "El Nombre es Requerido" },
            maxLength: {
              value: 50,
              message: "El Nombre no debe superar los 50 caracteres",
            },
            pattern: {
              value: /^[^\s\d]+$/,
              message:
                "El nombre de usuario no puede contener espacios ni números",
            },
          })}
        />
        {errors.name && <div className="error">{errors.name.message}</div>}
      </div>
      <div className="">
        <TextField
          required
          label="Apellido"
          type="text"
          {...register("lastname", {
            required: {
              value: true,
              message: "El Apellido es Requerido",
            },
            maxLength: {
              value: 50,
              message: "El Apellido no debe superar los 50 caracteres",
            },
            pattern: {
              value: /^[^\s\d]+$/,
              message: "El Apellido no puede contener espacios ni números",
            },
          })}
        />
        {errors.lastname && (
          <div className="error">{errors.lastname.message}</div>
        )}
      </div>
      {/* Username */}
      <div className="">
        <TextField
          required
          label="Usuario"
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "El Usuario es Requerido",
            },
            maxLength: {
              value: 50,
              message: "El Usuario no debe superar los 50 caracteres",
            },
            pattern: {
              value: /^\S+$/,
              message: "El nombre de usuario no puede contener espacios",
            },
          })}
        />
        {errors.username && (
          <div className="error">{errors.username.message}</div>
        )}
      </div>

      <div className="">
        <TextField
          required
          label="Email"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "El Email es Requerido",
            },
            maxLength: {
              value: 100,
              message: "El Email no debe superar los 100 caracteres",
            },
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "No es un formato valido de Email",
            },
          })}
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
      </div>

      <div className="">
        <TextField
          required
          label="Contraseña"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "El Password es Requerido",
            },
            minLength: {
              value: 6,
              message: "El Password debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}
      </div>

      <div className="">
        <TextField
          required
          label="Validar Contraseña"
          type="password"
          {...register("password2", {
            required: {
              value: true,
              message: "El Password es Requerido",
            },
            minLength: {
              value: 6,
              message: "El Password debe tener al menos 6 caracteres",
            },
            validate: (value) => {
              if (value != password) {
                return "Your passwords do no match";
              }
            },
          })}
        />
        {errors.password2 && (
          <div className="error">{errors.password2.message}</div>
        )}
      </div>

      <div className="">
        <TextField
          label="Phone"
          type="number"
          {...register("phone", {
            maxLength: {
              value: 20,
              message: "El Email no debe superar los 20 caracteres",
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "El numero de Telefono no puede contener letras",
            },
          })}
        />
        {errors.phone && <div className="error">{errors.phone.message}</div>}
      </div>

      <div className="">
        {/* Biografia */}
        <TextField
          className="Desciptionform"
          label="Biografia"
          type="text"
          multiline
          minRows={4}
          maxRows={7}
          {...register("bio", {
            required: {
              value: false,
            },
            maxLength: {
              value: 250,
              message: "La Biografia no debe superar los 250 caracteres",
            },
          })}
          placeholder="Biografia"
        />
        {errors.bio && <div className="error">{errors.bio.message}</div>}
      </div>

      <Stack spacing={1} direction="row" className="btncontainer">
        <Button className="btnlogin" type="submit" variant="contained">
          Crear Cuenta
        </Button>
      </Stack>
      <Stack spacing={1} direction="column" className="btncontainer">
        <p>¿Ya tienes una cuenta?</p>
        <Button
          className="btnlogin"
          type="button"
          variant="outlined"
          onClick={() => resetform()}
        >
          Inicia Sesión
        </Button>
      </Stack>
    </Box>
  );
};

CreateUserForm.propTypes = {
  setIsCreating: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
  isSelecting: PropTypes.bool.isRequired,
  setIsSelecting: PropTypes.func.isRequired,
};

export default CreateUserForm;
