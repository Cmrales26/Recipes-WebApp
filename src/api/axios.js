import axios from "axios";

const baseUrl = "http://localhost:5500/api";

const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default instance;
