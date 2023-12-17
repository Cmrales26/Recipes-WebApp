import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  LoginRequestHandler,
  CreateuserRequestHandler,
  SaveDietaryRequestHandler,
} from "../api/auth";

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
  const [error, setError] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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

  const creatUser = async (data) => {
    try {
      delete data.password2;
      const res = await CreateuserRequestHandler(data);
      console.log(data);
      setUser(data);
      console.log(res);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const saveusercategory = async (username, data) => {
    try {
      const res = await SaveDietaryRequestHandler(username, data);
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <Usercontext.Provider
      value={{ isAuth, error, user, creatUser, loginUser, saveusercategory }}
    >
      {children}
    </Usercontext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
