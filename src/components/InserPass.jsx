import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import { useParams } from "react-router-dom";
import { useState } from "react";

const InserPass = (props) => {
  const { validatepass, error, DisableAccount, logout } = UseUser();
  const params = useParams();
  const [SnackpassOpen, setSnackPassOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = handleSubmit(async (value) => {
    const res = await validatepass(params.username, value);

    if (res === 200) {
      DisableAccount(params.username);
      setSnackPassOpen(true);
      setTimeout(() => {
        logout();
      }, 2000);
    }
  });

  const onCancel = () => {
    setSnackPassOpen(false);
  };

  return (
    <div className="InserPass">
      <div className="">
        <h1>Ingrese Su contraseña</h1>
        <p>
          Para desactivar tu cuenta de forma temporal, ingresa tu contraseña a
          continuación. Ten en cuenta que al desactivarla, esta permanecerá
          inaccesible hasta que decidas reactivarla. Recuerda que la información
          asociada a tu cuenta se mantendrá intacta durante este proceso.
        </p>
      </div>
      {error ? <div className="error">{error}</div> : null}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onsubmit}
      >
        <Snackbar
          open={SnackpassOpen}
          autoHideDuration={2000}
          message="Usuario actualiado con exito"
          onClose={onCancel}
        >
          <Alert severity="success">Usuario Desactivado</Alert>
        </Snackbar>

        <TextField
          variant="filled"
          required
          label="Contraseña"
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
        ></TextField>
        {errors.password && <p className="error">{errors.password.message}</p>}
        <Stack spacing={2} direction="row">
          <Button type="submit" variant="contained">
            Validar Contraseña
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => props.setAccept(false)}
          >
            Cancelar
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default InserPass;
