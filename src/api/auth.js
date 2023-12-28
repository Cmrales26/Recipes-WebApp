import axios from "./axios";

export const LoginRequestHandler = (user) => axios.post("/signin", user);
export const CreateuserRequestHandler = (user) => axios.post("/signup", user);
export const LogoutRequestHandler = () => axios.post("/logout");
export const UpdateuserRequestHandler = (username, data) =>
  axios.patch(`/update/${username}`, data);

export const validatepassHandler = (username, password) =>
  axios.post(`/validatepass/${username}`, password);

export const sendEmailVerification = (username) =>
  axios.post(`SendVerificationPin/${username}`);
export const ChangePasswordHandler = (username, data) =>
  axios.patch(`changepass/${username}`, data);

// CheckLogin
export const CheckLogin = () => axios.get("/tokenCheck");

// Save Category
export const SaveDietaryRequestHandler = (username, dietary) =>
  axios.post(`/dietary/${username}`, dietary);

// ProfilePicture
export const RemoveProfilePicturehandler = (username) =>
  axios.post(`/removeProfilePhoto/${username}`);

export const ProfilePictureHandler = (data) =>
  axios.post(`/uploadProfilePhoto/`, data);
