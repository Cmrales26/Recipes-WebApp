import { useEffect, useState } from "react";
import LoginUserForm from "../components/LoginUserForm";
import CreateUserForm from "../components/CreateUserForm";
import UserSelectCategories from "../components/UserSelectCategories";
import { Navigate, useLocation } from "react-router-dom";
import { UseUser } from "../context/user.context";

const Login = () => {
  const location = useLocation();
  const [isCreating, setIscreating] = useState(false);
  const [isSelecting, setIsselecting] = useState(false);
  const [isLoginToReview, setIsloginToReview] = useState(false);
  const [stateusername, setstateusername] = useState();
  const [recipeId, setRecipeId] = useState();

  const { isAuth, user, loading } = UseUser();

  useEffect(() => {
    if (location.state !== null) {
      if (location.state.username === null) {
        setstateusername(null);
      } else {
        setstateusername(location.state.username);
      }

      if (location.state.RecipeId === null) {
        setRecipeId(null);
      } else {
        setRecipeId(location.state.RecipeId);
        setIsloginToReview(true);
      }
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={isSelecting ? "selectingCategories" : "InitForm"}>
      {isAuth ? (
        user.rol === "user" ? (
          isLoginToReview ? (
            <Navigate to={`/recipe/${recipeId}`} />
          ) : (
            <Navigate to="/home" />
          )
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
