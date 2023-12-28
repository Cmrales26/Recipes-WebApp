import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import UpdatePassForm from "../components/UpdatePassForm";

const UpdatePass = () => {
  const history = useNavigate();
  return (
    <section className="ContainerUpdatePass">
      <div className="Profile">
        <div className="profilenavigation">
          <Link to="#" onClick={() => history(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h3>Cambiar Contraseña</h3>
        </div>
        <UpdatePassForm></UpdatePassForm>
      </div>
    </section>
  );
};

export default UpdatePass;
