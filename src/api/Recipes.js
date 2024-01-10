import axios from "./axios";

export const gerRecipesHandler = () => axios.get("/recipes");
