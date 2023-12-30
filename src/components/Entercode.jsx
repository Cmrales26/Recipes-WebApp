import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import { useNavigate } from "react-router-dom";

const Entercode = (props) => {
  const navigate = useNavigate();
  const { VerifiPinRecovery, error, setError } = UseUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    const data = {
      username: props.userInfo.username,
      pin: values.code,
    };
    const res = await VerifiPinRecovery(data);
    if (res.status === 200) {
      navigate("/login/forgot/entercode/RecoveryPass", {
        state: {
          username: props.userInfo.username,
          pin: values.code,
          isRecovering: true,
        },
      });
    } else {
      setError(res.data);
    }
  });

  return (
    <section className="EntercodeContainer">
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
        <div className="">
          <h1>Introduzca el codigo</h1>
          <p>
            Por su seguridad hemos enviado un código de 6 dígitos al correo{" "}
            {props.userInfo.email}
          </p>
          <TextField
            required
            label={"Codigo"}
            type="number"
            {...register("code", {
              required: {
                value: true,
                message: "El codigo es requerido",
              },
              minLength: {
                value: 6,
                message: "El codigo debe tener al menos 6 digitos",
              },
              maxLength: {
                value: 6,
                message: "El codigo debe tener Maximos 6 digitos",
              },
            })}
          />
          {errors.code && <div className="error">{errors.code.message}</div>}
          {error ? <div className="error">{error}</div> : null}
          <div className="ReSend">
            <Button>Renviar Codigo</Button>
          </div>
        </div>
        <Button type="submit" variant="contained">
          Enviar Codigo
        </Button>
      </Box>
    </section>
  );
};

export default Entercode;
