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
    <>
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
          <CreateUserForm
            setIsCreating={setIscreating}
            isCreating={isCreating}
            isSelecting={isSelecting}
            setIsSelecting={setIsselecting}
          />
        )
      ) : (
        <LoginUserForm setIsCreating={setIscreating} isCreating={isCreating} />
      )}
    </>
  );
};

export default Login;
