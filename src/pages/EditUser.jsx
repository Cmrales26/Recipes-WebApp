import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import EditUserForm from "../components/EditUserForm";
import ProfilePictureForm from "../components/ProfilePictureForm";
import { useState } from "react";

const EditUser = () => {
  const history = useNavigate();
  const [isRemoving, setIsRemoving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [ppicture, setPpicture] = useState();
  return (
    <section className="ContainerEditProfile">
      <div className="Profile">
        <div>
          {" "}
          <div className="profilenavigation">
            <Link to="#" onClick={() => history(-1)}>
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
    </section>
  );
};

export default EditUser;
