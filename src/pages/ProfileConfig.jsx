import {
  faArrowLeft,
  faUser,
  faLock,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { UseUser } from "../context/user.context";

const ProfileConfig = () => {
  const { user } = UseUser();
  return (
    <section className="containerConfiguartion containerConfig">
      <div className="Profile">
        <div className="profilenavigation">
          <Link to="/home">
            <FontAwesomeIcon className="SearchIcon" icon={faArrowLeft} />
          </Link>
          <h3>Configuración</h3>
        </div>
        <div className="Navigationdow">
          <div className="UserInfoCag">
            <Link to={`/Profile/${user.username}/editAccount`}>
              <FontAwesomeIcon className="faUser" icon={faUser} />
              <span>Editar Perfil</span>
              <p>
                Actualiza y personaliza tu información para reflejar tu estilo
                culinario y preferencias.
              </p>
            </Link>
          </div>
          <div className="UserInfoCag">
            <Link to={`/Profile/${user.username}/ChangePassword`} className="">
              <FontAwesomeIcon icon={faLock} className="faLock" />
              <span>Cambiar Contraseña</span>

              <p>
                Mantén tu cuenta segura. Cambia tu contraseña fácilmente cuando
                lo necesites.
              </p>
            </Link>
          </div>
          <div className="UserInfoCag">
            <Link to={`/DisableAccount/${user.username}`} className="">
              <FontAwesomeIcon icon={faHeartBroken} className="faHeartBroken" />
              <span>Desactivar la cuenta</span>

              <p>
                Siempre tienes el control. Desactiva tu cuenta si lo deseas,
                aunque ¡esperamos que te quedes y sigas disfrutando de nuestras
                recetas!
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileConfig;
