// import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { UseUser } from "../context/user.context";
import { useEffect, useRef, useState } from "react";

const ProfilePictureForm = (props) => {
  const { user, uploadProfilePhoto } = UseUser();
  const [isOpendialog, setisOpendialog] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [file, setFile] = useState();
  const fileInputRef = useRef(null);

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    if (user.profilePictureUrl) {
      setProfilePhoto(user.profilePictureUrl);
    } else {
      setProfilePhoto("https://ionicframework.com/docs/img/demos/avatar.svg");
    }
  }, []);

  const RemovelartTrigger = () => {
    setisOpendialog(true);
  };

  const closeDialogAlert = () => {
    setisOpendialog(false);
  };

  const removehandler = () => {
    setProfilePhoto("https://ionicframework.com/docs/img/demos/avatar.svg");
    setisOpendialog(false);
    setFile();
    props.setIsRemoving(true);
    props.setIsEditing(false);
    props.setPpicture();
    if (!user.profilePictureUrl) fileInputRef.current.value = "";
  };

  const profilePicHandler = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setProfilePhoto(URL.createObjectURL(selectedFile));
    }
    props.setIsRemoving(false);
    props.setIsEditing(true);
    props.setPpicture(selectedFile);
  };
  
  return (
    <section className="PofilePictureSelect">
      {user.profilePictureUrl ? (
        <div className="">
          <figure>
            <img src={profilePhoto} alt="Foto de perfil" />
          </figure>
          <Stack direction="row" spacing={2}>
            <label htmlFor="file-upload">
              <Button
                component="span"
                variant="contained"
                size="small"
                style={{ width: "100%" }}
              >
                Cambiar Foto
              </Button>
            </label>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              onChange={profilePicHandler}
            />
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={RemovelartTrigger}
            >
              Eliminar Foto
            </Button>
          </Stack>
        </div>
      ) : (
        <div className="">
          <figure>
            <img src={profilePhoto} alt="Foto de perfil" />
          </figure>
          <Stack direction="row" spacing={2}>
            <label htmlFor="file-upload">
              <Button
                component="span"
                variant="contained"
                size="small"
                style={{ width: "100%" }}
              >
                Cambiar Foto
              </Button>
            </label>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              onChange={profilePicHandler}
            />
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={RemovelartTrigger}
              disabled={!file}
            >
              Eliminar Foto
            </Button>
          </Stack>
        </div>
      )}

      <Dialog
        open={isOpendialog}
        onClose={closeDialogAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Eliminar foto de perfil
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción eliminara su foto de perfil, ¿Esta seguro que desea
            continuar? Ruerde que para para finalizar debe precionar editar
            Perfil en la parte inferior
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialogAlert()}>Cancelar</Button>
          <Button color="error" onClick={() => removehandler()} autoFocus>
            Acpetar
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default ProfilePictureForm;
