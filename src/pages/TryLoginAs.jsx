import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { UseUser } from "../context/user.context";
import { useNavigate } from "react-router-dom";

const TryLoginAs = () => {
  const { getUser, error, setError, sendEmail } = UseUser();
  const [user, setUser] = useState();
  const [userFound, setUserFound] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  // const [error, setError] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await getUser({ data: user });
    if (res.status === 203) {
      setError("Usuario no Registrado");
      return;
    }
    setUserFound(res.data);
    setSelectedValue(res.data.email);
  };

  const handleradioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const actionformfp = (e) => {
    e.preventDefault();

    if (selectedValue === "password") {
      navigate("/login", {
        state: { username: userFound.username },
      });
      return;
    }

    sendEmail(userFound.username, { tipo: "RE" })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login/forgot/entercode", {
            state: {
              username: userFound.username,
              email: userFound.email,
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const navigate = useNavigate();

  return (
    <section className="tryloginas">
      <div className="ResetOptios">
        {userFound ? (
          <section className="EnviarCodigoReinicioContainer">
            <h1>Reiniciar Contraseña</h1>
            <hr />
            <div className="EnviarCodigoReinicio">
              <div className="Options">
                <form onSubmit={actionformfp}>
                  <FormControl component="fieldset">
                    <div className="ChangeUserPassForm">
                      <div className="Whattodo">
                        <FormLabel component="legend">
                          Como desea recibir su código de verificación
                        </FormLabel>
                        <RadioGroup
                          aria-label="method"
                          name="method"
                          value={selectedValue}
                          onChange={handleradioChange}
                        >
                          <FormControlLabel
                            value={userFound.email}
                            control={<Radio />}
                            label="Enviar el código vía Email"
                          />
                          <FormControlLabel
                            value="password"
                            control={<Radio />}
                            label="Ingresar Contraseña"
                          />
                        </RadioGroup>
                      </div>
                      <div className="UserInfo">
                        <figure>
                          <img src={userFound.profilePictureUrl} alt="" />
                        </figure>
                        <p>
                          {userFound.name} <span> </span>
                          {userFound.lastname}
                        </p>
                        <Stack
                          spacing={2}
                          direction="row"
                          className="btncontainer"
                        >
                          <Button
                            type="button"
                            className="cancelsendemail"
                            variant="contained"
                            onClick={() => navigate("/login")}
                          >
                            No soy yo
                          </Button>
                          <Button type="submit" variant="contained">
                            Enviar
                          </Button>
                        </Stack>
                      </div>
                    </div>
                  </FormControl>
                </form>
              </div>
            </div>
          </section>
        ) : (
          <div className="FoundUser">
            <h1>Buscar Cuenta</h1>
            <hr />
            <p>
              Por favor ingrese su nombre de usuario y correo electronico para
              encontrar tu cuenta
            </p>
            {error ? <>{error}</> : null}
            <div className="FormularioBusqueda">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                onSubmit={onSubmit}
              >
                <TextField
                  id="outlined-basic"
                  label="Username o email"
                  variant="outlined"
                  size="medium"
                  onChange={(e) => setUser(e.target.value)}
                />
                <Stack spacing={2} direction="row" className="btncontainer">
                  <Button
                    type="button"
                    className="cancelfounduser"
                    variant="contained"
                    onClick={() => navigate("/login")}
                  >
                    cancelar
                  </Button>
                  <Button type="submit" variant="contained">
                    Buscar Usuario
                  </Button>
                </Stack>
              </Box>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TryLoginAs;
