import axios from "./axios";

export const LoginRequestHandler = (user) => axios.post("/signin", user);
export const CreateuserRequestHandler = (user) => axios.post("/signup", user);
export const LogoutRequestHandler = () => axios.post("/logout");

// CheckLogin
export const CheckLogin = () => axios.get("/tokenCheck");

// Save Category
export const SaveDietaryRequestHandler = (username, dietary) =>
  axios.post(`/dietary/${username}`, dietary);
