import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Entercode = (props) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(100);
  const [tries, setTries] = useState(0);
  const [canresend, setCanResend] = useState(true);
  const [SnackpassOpen, setSnackPassOpen] = useState(false);

  const { sendEmail, EnablaAccount } = UseUser();

  useEffect(() => {
    if (props.RecoveAcc) {
      sendEmail(props.userInfo.username, { tipo: "SE" });
    }
  }, []);

  useEffect(() => {
    const value = setInterval(() => {
      setCount((oldCount) => (oldCount > 0 ? oldCount - 1 : 0));
    }, 50);
    return () => {
      clearInterval(value);
      if (tries === 2) {
        setCanResend(false);
      }
    };
  });

  const resendEmail = () => {
    setTries(tries + 1);

    if (canresend) {
      setCount(100);
      sendEmail(props.userInfo.username, { tipo: "RE" });
    }
  };

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
      if (!props.RecoveAcc) {
        navigate("/login/forgot/entercode/RecoveryPass", {
          state: {
            username: props.userInfo.username,
            pin: values.code,
            isRecovering: true,
          },
        });
      } else {
        const res = await EnablaAccount(props.userInfo.username, {
          codeverify: values.code,
        });
        if (res.status === 200) {
          setSnackPassOpen(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
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
        <Snackbar
          open={SnackpassOpen}
          autoHideDuration={2000}
          message="Usuario actualiado con exito"
        >
          <Alert severity="success">Usuario activad: Inicie Sesión</Alert>
        </Snackbar>
        <div className="">
          <h1>Introduzca el codigo</h1>
          <p>
            Por su seguridad hemos enviado un código de 6 dígitos al correo{" "}
            <b>{props.userInfo.email}</b>
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
          <div className="ResendCode">
            {canresend ? (
              <Button
                disabled={count === 0 ? false : true}
                onClick={resendEmail}
              >
                Volver a Enviar Código
              </Button>
            ) : (
              <Button disabled>No se puede reenviar el codigo</Button>
            )}

            {count === 0 ? null : (
              <CircularProgress variant="determinate" value={count} />
            )}
          </div>
        </div>
        <Stack spacing={2} direction="row" className="btncontainer">
          <Button type="submit" variant="contained">
            Enviar Codigo
          </Button>
          <Button
            className="btnlogin"
            onClick={() => navigate("/home")}
            type="button"
            variant="outlined"
          >
            cancelar
          </Button>
        </Stack>
      </Box>
    </section>
  );
};

export default Entercode;
