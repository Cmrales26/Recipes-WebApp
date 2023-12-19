import { faArrowLeft, faUser, faLock, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ProfileConfig = () => {
  return (
    <div className="Profile">
      <div className="profilenavigation">
        <Link to="/home">
          <FontAwesomeIcon className="SearchIcon" icon={faArrowLeft} />
        </Link>
        <h3>Configuración</h3>
      </div>
      <div className="Navigationdow">
        <Link to={"/Editacount"} className="UserInfoCag">
          <FontAwesomeIcon className="SearchIcon" icon={faUser} />
          Información de la cuenta
        </Link>
        <Link to={"/Editacount"} className="UserInfoCag">
          <FontAwesomeIcon className="SearchIcon" icon={faLock} />
          Cambiar Contraseña
        </Link>
        <Link to={"/Editacount"} className="UserInfoCag">
          <FontAwesomeIcon className="SearchIcon" icon={faHeartBroken} />
          Desactivar la cuenta
        </Link>
      </div>
    </div>
  );
};

export default ProfileConfig;
