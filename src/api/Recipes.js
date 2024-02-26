import axios from "./axios";

export const createRecipeHandler = (data) => axios.post("/create/recipe", data);
export const getRecipesHandler = () => axios.get("/recipes");
export const getRecipeHandler = (id_receta) =>
  axios.get(`/recipes/${id_receta}`);

export const getFavRecipeHandler = () => axios.get("/favrecipe");

export const uploadRecipeImgHandler = (data) =>
  axios.post("/uploadimageRecipe", data);

export const RecipeScoreHandler = (data) =>
  axios.post("/recipe/userScore", data);

export const serRecipeScoreHandler = (data) =>
  axios.post("/recipe/setReview", data);

export const getReviewsHandler = (data) =>
  axios.post("/recipe/getReviews", data);

export const updateReviewHandler = (data) =>
  axios.patch("/recipe/updateReview", data);
