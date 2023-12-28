import {
  Box,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { UseUser } from "../context/user.context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EditUserForm = (props) => {
  const {
    user,
    error,
    updateUser,
    setError,
    removeProfilePhoto,
    uploadProfilePhoto,
  } = UseUser();
  const [password, setPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const Navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    async function loadUser() {
      if (params.username) {
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

  const [modalpassOpen, setModalPassOpen] = useState(false);
  const [SnackpassOpen, setSnackPassOpen] = useState(false);

  const onSubmit = handleSubmit(() => {
    setModalPassOpen(true);
  });
  const onCancel = () => {
    setModalPassOpen(false);
  };

  const changeUserData = async () => {
    const data = {
      name: getValues("name"),
      lastname: getValues("lastname"),
      username: getValues("username"),
      email: getValues("email"),
      bio: getValues("bio"),
      phone: getValues("phone"),
      password: password,
      removing: props.isRemoving,
      editing: props.isEditing,
    };

    if (password.trim() !== "") {
      const res = await updateUser(user.username, data);
      if (res.status === 200) {
        if (props.isRemoving) {
          removeProfilePhoto(user.username);
        }
        if (props.isEditing) {
          const formData = new FormData();
          formData.append("file", props.ppicture, `${user.username}.jpg`);
          uploadProfilePhoto(formData);
        }
        setSnackPassOpen(true);
        setTimeout(() => {
          Navigate("/home", { replace: true });
          window.location.reload();
        }, 1000);
      }
    } else {
      setError("Por favor ingrese su contraseña");
    }
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
      <Snackbar
        open={SnackpassOpen}
        autoHideDuration={600}
        message="Usuario actualiado con exito"
        onClose={onCancel}
      >
        <Alert severity="success">Usuario actualizado</Alert>
      </Snackbar>
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
        {errors.phone && <div className="error">{errors.phone.message}</div>}
      </div>
      <div className="">
        <TextField
          label="Biografia"
          multiline={true}
          rows={4}
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
      <Dialog
        open={modalpassOpen}
        onClose={onCancel}
        className="DialogCheckPass"
      >
        {error ? <div className="servereror"> {error}</div> : null}
        <DialogTitle>Ingrese su contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por tu seguridad, por favor valida tu contraseña para realizar
            cambios en tu cuenta.
          </DialogContentText>
          <TextField
            required
            focused
            margin="dense"
            id="name"
            label="Constraseña"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => changeUserData()}>Aceptar</Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditUserForm;
