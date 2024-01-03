import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  LoginRequestHandler,
  CreateuserRequestHandler,
  SaveDietaryRequestHandler,
  CheckLogin,
  LogoutRequestHandler,
  UpdateuserRequestHandler,
  validatepassHandler,
  sendEmailVerification,
  ChangePasswordHandler,
  RemoveProfilePicturehandler,
  ProfilePictureHandler,
  getuserData,
  VerifyPin,
  DisableAccountHandle,
  EnableAccountHandle,
} from "../api/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

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
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function logincheck() {
      let token = cookies.get("token");
      if (!token) {
        setIsAuth(false);
        setLoading(false);
        return;
      }

      try {
        const res = await CheckLogin();
        setIsAuth(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    logincheck();
  }, []);

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const creatUser = async (data) => {
    try {
      delete data.password2;
      const res = await CreateuserRequestHandler(data);
      console.log(res);
      console.log(data);
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      return "error";
    }
  };

  const loginUser = async (data) => {
    try {
      const res = await LoginRequestHandler(data);
      setUser(res.data);
      setIsAuth(true);
      setLoading(false);
      return res;
    } catch (error) {
      setError(error.response.data.message);
      return error;
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

  const logout = async () => {
    try {
      const res = await LogoutRequestHandler();
      console.log(res);
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const updateUser = async (username, data) => {
    try {
      const res = await UpdateuserRequestHandler(username, data);
      return res;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const validatepass = async (username, password) => {
    try {
      const res = await validatepassHandler(username, password);
      return res.status;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const sendEmail = async (username, tipo) => {
    try {
      const res = await sendEmailVerification(username, tipo);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const changePassword = async (username, data) => {
    try {
      const res = await ChangePasswordHandler(username, data);
      return res;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const uploadProfilePhoto = async (data) => {
    try {
      const res = await ProfilePictureHandler(data);
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const removeProfilePhoto = async (username) => {
    try {
      const res = await RemoveProfilePicturehandler(username);
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const getUser = async (username) => {
    try {
      const res = await getuserData(username);
      return res;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const VerifiPinRecovery = async (data) => {
    try {
      const res = await VerifyPin(data);
      return res;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const DisableAccount = async (username) => {
    try {
      const res = await DisableAccountHandle(username);
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const EnablaAccount = async (username, code) => {
    try {
      const res = await EnableAccountHandle(username, code);
      return res;
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <Usercontext.Provider
      value={{
        isAuth,
        error,
        user,
        loading,
        setError,
        creatUser,
        loginUser,
        saveusercategory,
        logout,
        updateUser,
        validatepass,
        sendEmail,
        changePassword,
        removeProfilePhoto,
        uploadProfilePhoto,
        getUser,
        VerifiPinRecovery,
        DisableAccount,
        EnablaAccount,
      }}
    >
      {children}
    </Usercontext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
