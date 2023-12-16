import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { LoginRequestHandler } from "../api/auth";

export const Usercontext = createContext();

export const UseUser = () => {
  const context = useContext(Usercontext);
  if (!context) {
    throw new Error("usercontext must be used in a usercontext");
  } else {
    return context;
  }
};

export const UserProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  const loginUser = async (data) => {
    try {
      const res = await LoginRequestHandler(data);
      console.log(data);
      console.log(res);
      setIsAuth(true);
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <Usercontext.Provider value={{ isAuth, loginUser, error }}>
      {children}
    </Usercontext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
