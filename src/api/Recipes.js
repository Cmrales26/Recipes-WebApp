import axios from "./axios";

export const createRecipeHandler = (data) => axios.post("/create/recipe", data);
export const getRecipesHandler = () => axios.get("/recipes");
export const getRecipeHandler = (id_receta) =>
  axios.get(`/recipes/${id_receta}`);

export const uploadRecipeImgHandler = (data) =>
  axios.post("/uploadimageRecipe", data);
