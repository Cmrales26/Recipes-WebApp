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
    <div className="Profile">
      <div className="profilenavigation">
        <Link to="/home">
          <FontAwesomeIcon className="SearchIcon" icon={faArrowLeft} />
        </Link>
        <Link to="/edit">
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
        <Link to="/#" className="UserInfoCag">
          <FontAwesomeIcon icon={faHeart} /> {" Mis Favoritos"}
        </Link>
        <Link to="/#" className="UserInfoCag">
          <FontAwesomeIcon icon={faLayerGroup} /> {" Mis Categorias"}
        </Link>
        <Link to="/#" className="UserInfoCag">
          <FontAwesomeIcon icon={faStar} /> {" Mis Calificaciones"}
        </Link>
        <Link to="/#" className="UserInfoCag">
          <FontAwesomeIcon icon={faGear} /> {" Configuración"}
        </Link>
      </div>
      <hr />
      <div className="logout">
        <Link onClick={() => logout()}>
          <FontAwesomeIcon icon={faPowerOff} /> {"Cerrar Sesión"}
        </Link>
      </div>
    </div>
  );
};

export default Profile;
