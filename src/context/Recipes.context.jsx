import { createContext, useContext } from "react";
import { gerRecipesHandler } from "../api/Recipes";

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
  const getRecipes = async () => {
    try {
      const res = await gerRecipesHandler();
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <RecipesContext.Provider value={{ getRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};
