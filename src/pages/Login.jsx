import { useState } from "react";
import LoginUserForm from "../components/LoginUserForm";
import CreateUserForm from "../components/CreateUserForm";
import UserSelectCategories from "../components/UserSelectCategories";

const Login = () => {
  const [isCreating, setIscreating] = useState(false);
  const [isSelecting, setIsselecting] = useState(false);

  return (
    <>
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
