import { createContext, useContext } from "react";
import {
  getRecipeHandler,
  getRecipesHandler,
  createRecipeHandler,
  uploadRecipeImgHandler,
  RecipeScoreHandler,
  serRecipeScoreHandler,
  updateReviewHandler,
  getReviewsHandler,
} from "../api/Recipes";

export const RecipesContext = createContext();

export const UseRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("categoriescontext must be used in a categoriescontext");
  } else {
    return context;
  }
};

export const RecipesProvider = ({ children }) => {
  const createRecipe = async (data) => {
    try {
      const res = await createRecipeHandler(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const UploadRecipeimg = async (data) => {
    try {
      const res = await uploadRecipeImgHandler(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const getRecipes = async () => {
    try {
      const res = await getRecipesHandler();
      return res;
    } catch (error) {
      return error;
    }
  };
  const getRecipe = async (id_receta) => {
    try {
      const res = await getRecipeHandler(id_receta);
      return res;
    } catch (error) {
      return error;
    }
  };

  const getUserScore = async (data) => {
    try {
      const res = await RecipeScoreHandler(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const setUserScore = async (data) => {
    try {
      const res = await serRecipeScoreHandler(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  const updateScore = async (data) => {
    try {
      const res = await updateReviewHandler(data);
      return res;
    } catch (error) {
      return error;
    }
  };

  const getReviews = async (data) => {
    try {
      const res = await getReviewsHandler(data);
      return res;
    } catch (error) {
      return error;
    }
  };
  return (
    <RecipesContext.Provider
      value={{
        getRecipes,
        getRecipe,
        createRecipe,
        UploadRecipeimg,
        getUserScore,
        setUserScore,
        updateScore,
        getReviews,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
