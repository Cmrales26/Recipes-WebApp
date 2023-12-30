import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const UpdatePassForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [isRecovering, setisRecovering] = useState(false);

  useEffect(() => {
    if (props.dataRecovery !== undefined) {
      setisRecovering(true);
    } else {
      setisRecovering(false);
    }
  }, []);

  const navigate = useNavigate();

  const { validatepass, user, error, changePassword, loginUser } = UseUser();

  const onSubmit = handleSubmit(async (value) => {
    if (!isRecovering) {
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
    } else {
      const data = {
        newpassword: value.NewPassword,
        codeverify: props.dataRecovery.pin,
      };
      const res = await changePassword(props.dataRecovery.username, data);
      if (res.status === 200) {
        const logindata = {
          username: props.dataRecovery.username,
          password: value.NewPassword,
        };
        const res = await loginUser(logindata);
        navigate("/login");
      }
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
          style={{ display: isRecovering ? "none" : null }}
          required
          label={"Contraseña Actual"}
          type="password"
          {...register("Password", {
            required: isRecovering
              ? false
              : {
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
              message: "La contraseña es Requerida",
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
          {isRecovering ? "RecuperarContraseña" : "Cambiar Contraseña"}
        </Button>
      </Stack>
    </Box>
  );
};

export default UpdatePassForm;
