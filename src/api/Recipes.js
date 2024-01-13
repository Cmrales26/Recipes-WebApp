import axios from "./axios";

export const getRecipesHandler = () => axios.get("/recipes");
export const getRecipeHandler = (id_receta) =>
  axios.get(`/recipes/${id_receta}`);
