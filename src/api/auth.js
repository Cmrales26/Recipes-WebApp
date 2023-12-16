import axios from "./axios";

export const LoginRequestHandler = (user) => axios.post("/signin", user);
