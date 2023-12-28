import { useState } from "react";
import LoginUserForm from "../components/LoginUserForm";
import CreateUserForm from "../components/CreateUserForm";
import UserSelectCategories from "../components/UserSelectCategories";
import { Navigate } from "react-router-dom";
import { UseUser } from "../context/user.context";

const Login = () => {
  const [isCreating, setIscreating] = useState(false);
  const [isSelecting, setIsselecting] = useState(false);

  const { isAuth, user, loading } = UseUser();

  if (loading) {
    return <div>Loading...</div>;
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
              <img src="images/Imagotipo.svg" alt="Logotipo de la pagina RC" />
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
            <img src="images/Imagotipo.svg" alt="Logotipo de la pagina RC" />
          </figure>
          <LoginUserForm
            setIsCreating={setIscreating}
            isCreating={isCreating}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
