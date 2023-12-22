import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import { useNavigate } from "react-router-dom";
const UpdatePassForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const { validatepass, user, error } = UseUser();

  const onSubmit = handleSubmit(async (value) => {
    const data = {
      password: value.Password,
    };
    try {
      const res = await validatepass(user.username, data);
      if (res !== 200) {
        console.log("Invalid password");
        return;
      }
      navigate(`/Profile/${user.username}/ChangePassword/VerifacationCode`, {
        state: { Newpassword: value.NewPassword },
      });
    } catch (error) {
      console.log(error);
    }
  });

  const Newpassword = watch("NewPassword");

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
      {error ? <div className="servereror"> {error}</div> : null}
      <div className="" style={{ marginTop: "20px" }}>
        <TextField
          required
          label={"Contraseña Actual"}
          type="password"
          {...register("Password", {
            required: {
              value: true,
              message: "La contraseña actual es requerida",
            },
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.Password && (
          <div className="error">{errors.Password.message}</div>
        )}
      </div>
      <div className="">
        <TextField
          required
          label={"Nueva Contraseña"}
          type="password"
          {...register("NewPassword", {
            required: {
              value: true,
              message: "La nueva contraseña es requerida",
            },
            minLength: {
              value: 6,
              message: "La nueva contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.NewPassword && (
          <div className="error">{errors.NewPassword.message}</div>
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
              if (value != Newpassword) {
                return "Your passwords do no match";
              }
            },
          })}
        />
        {errors.password2 && (
          <div className="error">{errors.password2.message}</div>
        )}
      </div>
      <Stack spacing={1} direction="row" className="btncontainer">
        <Button className="btnlogin" type="submit" variant="contained">
          Cambiar Contraseña
        </Button>
      </Stack>
    </Box>
  );
};

export default UpdatePassForm;
