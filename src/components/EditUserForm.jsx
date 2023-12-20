import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditUserForm = () => {
  const { user, error } = UseUser();
  const {
    register,
    // handleSubmit,
    formState: { errors },
    setValue,
    // reset,
  } = useForm();

  const params = useParams();
  useEffect(() => {
    async function loadUser() {
      if (params.username) {
        console.log(user);
        setValue("name", user.name);
        setValue("lastname", user.lastname);
        setValue("username", user.username);
        setValue("email", user.email);
        setValue("bio", user.bio);
        setValue("phone", user.phone);
      }
    }
    loadUser();
  }, []);
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
      className="LoginFormConainer"
    >
      {error ? <div className="servereror"> {error}</div> : null}

      <div className="">
        <TextField
          disabled
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
        {errors.email && <div className="error">{errors.email.message}</div>}
      </div>

      <div className="">
        {/* Biografia */}
        <TextField
          label="Biografia"
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
          Editar Perfil
        </Button>
      </Stack>
    </Box>
  );
};

export default EditUserForm;
