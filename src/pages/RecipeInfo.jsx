import React from "react";
import Recipe from "../components/RecipesComponents/Recipe";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const RecipeInfo = () => {
  const params = useParams();
  return (
    <>
      <Navbar />
      <Recipe recipeCode={params.recipeCode}></Recipe>
    </>
  );
};

export default RecipeInfo;
