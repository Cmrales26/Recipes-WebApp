import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { UseUser } from "../context/user.context";
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
import { useEffect, useState } from "react";
const CodeValidation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [correctemail, setCorrectemail] = useState(false);
  const { user, sendEmail, changePassword, setError, error } = UseUser();
  const [status, setStatus] = useState("");
  const [SnackpassOpen, setSnackPassOpen] = useState(false);
  const [count, setCount] = useState(100);
  const [canresend, setCanResend] = useState(true);
  const [tries, setTries] = useState(0);
  const params = useParams();

  useEffect(() => {
    if (!correctemail) {
      return;
    }
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
      sendEmail(user.username, { tipo: "RE" });
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const Navigate = useNavigate();

  if (!location.state || location.state.Newpassword === null) {
    navigate("/home");
    return null;
  }

  if (user.username !== params.username) {
    navigate("/home");
    return null;
  }

  const hideMail = (email) => {
    const [name, address] = email.split("@");
    const hidename = `${name.slice(0, 4)}*****`;
    // const hiddenaddress = `****.${address.split(".").pop()}`;
    return `${hidename}@${address}`;
  };

  const onSubmit = handleSubmit(async (value) => {
    if (correctemail) {
      const data = {
        newpassword: location.state.Newpassword,
        codeverify: value.code,
      };
      const res = await changePassword(user.username, data);
      if (res.status === 200) {
        setSnackPassOpen(true);
        setTimeout(() => {
          Navigate("/home", { replace: true });
          window.location.reload();
        }, 1000);
      }
    } else {
      if (value.email === user.email) {
        sendEmail(user.username, { tipo: "SE" })
          .then((res) => {
            console.log(res.data);
            setStatus(res.status);
          })
          .catch((err) => {
            console.error(err);
          });
        setCorrectemail(true);
      } else {
        setCorrectemail(false);
        setError("El email no es el correcto");
      }
    }
  });

  return (
    <>
      <section className="CodeValidation">
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
            autoHideDuration={600}
            message="Usuario actualiado con exito"
          >
            <Alert severity="success">Contraseña Actualizada Con exito</Alert>
          </Snackbar>
          {correctemail ? (
            <div>
              <h2>Intoduzca el codigo</h2>
              <p>
                {status === 202
                  ? `Su código de verificación ha sido enviado anteriormente, por favor revise el correo ${hideMail(
                      user.email
                    )}`
                  : `Por su seguridad hemos enviado un código de 6 dígitos al correo ${hideMail(
                      user.email
                    )}`}
              </p>
              {error ? (
                <p style={{ marginTop: "10px" }} className="error">
                  {error}
                </p>
              ) : null}
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
              <div className="ResendCode">
                {canresend ? (
                  <Button
                    disabled={count === 0 ? false : true}
                    onClick={resendEmail}
                  >
                    Volver a Enviar Código
                  </Button>
                ) : (
                  <Button
                    // color="success"
                    disabled
                  >
                    No se puede reenviar el codigo
                  </Button>
                )}

                {count === 0 ? null : (
                  <CircularProgress variant="determinate" value={count} />
                )}
              </div>

              {errors.code && (
                <div className="error">{errors.code.message}</div>
              )}

              <Stack spacing={1} direction="row" className="btncontainer">
                <Button className="btnlogin" type="submit" variant="contained">
                  Confirmar
                </Button>
                <Button
                  className="btnlogin"
                  onClick={() => setCorrectemail(false)}
                  type="button"
                  variant="outlined"
                >
                  cancelar
                </Button>
              </Stack>
            </div>
          ) : (
            <div>
              <h2>Intoduzca su email</h2>
              <p>
                Por su seguridad complete el siguente correo electronico
                electronico {hideMail(user.email)} para enviar un código de
                verificación.
              </p>
              {error ? (
                <p style={{ marginTop: "10px" }} className="error">
                  {error}
                </p>
              ) : null}
              <TextField
                required
                label={"Email"}
                type="email"
                variant="outlined"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El email es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "El email no es válido",
                  },
                })}
              />
              <div className="Alreadyhavecode">
                <a
                  style={{ fontSize: "14px" }}
                  onClick={() => setCorrectemail(true)}
                >
                  Ya tengo un Código
                </a>
              </div>
              {errors.email && (
                <div className="error">{errors.email.message}</div>
              )}
              <Stack spacing={2} direction="row" className="btncontainer">
                <Button className="btnlogin" type="submit" variant="contained">
                  Enviar codigo de verificación
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
            </div>
          )}
        </Box>
      </section>
    </>
  );
};

export default CodeValidation;
