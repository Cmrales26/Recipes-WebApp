import { createContext, useContext } from "react";
import {
  getRecipeHandler,
  getRecipesHandler,
  createRecipeHandler,
  uploadRecipeImgHandler,
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
      console.log(error);
    }
  };

  const UploadRecipeimg = async (data) => {
    try {
      const res = await uploadRecipeImgHandler(data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const getRecipes = async () => {
    try {
      const res = await getRecipesHandler();
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const getRecipe = async (id_receta) => {
    try {
      const res = await getRecipeHandler(id_receta);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RecipesContext.Provider
      value={{ getRecipes, getRecipe, createRecipe, UploadRecipeimg }}
    >
      {children}
    </RecipesContext.Provider>
  );
};
