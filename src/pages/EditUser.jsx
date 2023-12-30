import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import EditUserForm from "../components/EditUserForm";
import ProfilePictureForm from "../components/ProfilePictureForm";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const EditUser = () => {
  const history = useNavigate();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [ppicture, setPpicture] = useState();

  const [goBack, setBack] = useState(false);
  const back = () => {
    if (isEditing || isRemoving) {
      setBack(true);
      return;
    }
    history(-1);
  };

  return (
    <section className="ContainerEditProfile">
      <div className="Profile">
        <div>
          {" "}
          <div className="profilenavigation">
            <Link to="#" onClick={back}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h3>Editar Perfil</h3>
          </div>
        </div>
        <ProfilePictureForm
          setIsEditing={setIsEditing}
          setIsRemoving={setIsRemoving}
          setPpicture={setPpicture}
        />
        <EditUserForm
          isRemoving={isRemoving}
          isEditing={isEditing}
          ppicture={ppicture}
        />
      </div>

      <Dialog
        open={goBack}
        onClose={() => setDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Se han detectados cambios en la foto de perfil
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si desea establecer los cambios del perfil por favor precione el
            boton editar perfil en la parte inferior del formulario
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBack(false)} autoFocus>
            Ok
          </Button>
          <Button onClick={() => history(-1)} color="error" autoFocus>
            No realizar los cambios
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default EditUser;
