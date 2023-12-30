import { useState } from "react";
import LoginUserForm from "../components/LoginUserForm";
import CreateUserForm from "../components/CreateUserForm";
import UserSelectCategories from "../components/UserSelectCategories";
import { Navigate, useLocation } from "react-router-dom";
import { UseUser } from "../context/user.context";

const Login = () => {
  const location = useLocation();
  const [isCreating, setIscreating] = useState(false);
  const [isSelecting, setIsselecting] = useState(false);

  const { isAuth, user, loading } = UseUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  let stateusername = "";

  if (location.state === null) {
    stateusername = null;
  } else {
    stateusername = location.state.username;
  }

  return (
    <div className={isSelecting ? "selectingCategories" : "InitForm"}>
      {isAuth ? (
        user.rol === "user" ? (
          <Navigate to="/home" />
        ) : user.rol === "admin" ? (
          <Navigate to="/admin" />
        ) : (
          <Navigate to="/login" />
        )
      ) : null}

      {isCreating ? (
        isSelecting ? (
          <UserSelectCategories />
        ) : (
          <div className="LoginForm">
            <figure>
              <img
                src="/images/Imagotipo.svg"
                alt="Logotipo de la pagina RCaaa"
              />
            </figure>
            <CreateUserForm
              setIsCreating={setIscreating}
              isCreating={isCreating}
              isSelecting={isSelecting}
              setIsSelecting={setIsselecting}
            />
          </div>
        )
      ) : (
        <div className="LoginForm">
          <figure>
            <img src="/images/Imagotipo.svg" alt="Logotipo de la pagina RC" />
          </figure>
          <LoginUserForm
            setIsCreating={setIscreating}
            isCreating={isCreating}
            statteusername={stateusername}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
