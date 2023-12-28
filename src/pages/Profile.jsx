import { Link } from "react-router-dom";
import { UseUser } from "../context/user.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPen,
  faPhone,
  faEnvelope,
  faLayerGroup,
  faHeart,
  faStar,
  faGear,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

// import {  } from "@fortawesome/free-regular-svg-icons";

const Profile = () => {
  const { user, logout } = UseUser();
  return (
    <section className="ProfileContainer containerConfig">
      <div className="Profile">
        <div className="profilenavigation">
          <Link to="/home">
            <FontAwesomeIcon className="SearchIcon" icon={faArrowLeft} />
          </Link>
          <Link to={`/Profile/${user.username}/editAccount`}>
            <FontAwesomeIcon className="SearchIcon" icon={faPen} />
          </Link>
        </div>
        <div className="userinfo">
          {/* <div className="profileimage">
          <img
            src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg"
            alt="Profile Image"
          />
        </div> */}
          <div className="usernameinfoprofila">
            <h2>{user.name + " " + user.lastname}</h2>
            <p>{user.bio}</p>
          </div>
        </div>
        {/*  */}
        <div className="contact">
          <h3>Contacto</h3>
          <p>
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: "9px" }} />{" "}
            {user.phone}
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "9px" }} />{" "}
            {user.email}
          </p>
        </div>

        <div className="Navigationdow">
          <Link to="/#" className="">
            <div className="UserInfoCag">
              <FontAwesomeIcon icon={faHeart} className="faHeart" />{" "}
              <span>Mis Favoritos</span>
              <p>
                Mira tus recetas más amadas en un lugar especial para acceder a
                ellas fácilmente y disfrutarlas en cualquier momento.
              </p>
            </div>
          </Link>
          <Link to="/#" className="">
            <div className="UserInfoCag">
              <FontAwesomeIcon icon={faLayerGroup} className="faLayerGroup" />{" "}
              <span>Mis Categorias</span>{" "}
              <p>
                Explora un mundo de posibilidades culinarias organizadas por
                tipo de plato, ingredientes o preferencias dietéticas. Encuentra
                nuevas recetas y redescubre clásicos.
              </p>
            </div>
          </Link>
          <Link to="/#" className="">
            <div className="UserInfoCag">
              <FontAwesomeIcon icon={faStar} className="faStar" />{" "}
              <span>Mis Calificaciones</span>
              <p>
                Revisa tus impresiones y experiencias culinarias. Califica las
                recetas que has probado y descubre las mejor valoradas por la
                comunidad.
              </p>
            </div>
          </Link>
          <Link to={`/Profile/${user.username}/configuration`} className="">
            <div className="UserInfoCag">
              {" "}
              <FontAwesomeIcon icon={faGear} className="faGear" />{" "}
              <span>Configuración</span>
              <p>
                Personaliza tu perfil y ajusta la página según tus preferencias.
                Gestiona tu cuenta para una experiencia más adaptada a ti.
              </p>
            </div>
          </Link>
        </div>
        <hr />
        <div className="logout">
          <Link onClick={() => logout()}>
            <FontAwesomeIcon icon={faPowerOff} /> {"Cerrar Sesión"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;
