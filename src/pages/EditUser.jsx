import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import EditUserForm from "../components/EditUserForm";

const EditUser = () => {
  const history = useNavigate();
  return (
    <>
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
      </div>
      <EditUserForm />
    </>
  );
};

export default EditUser;
