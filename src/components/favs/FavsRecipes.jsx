import React, { useEffect, useState } from "react";
import FavoritesCards from "./FavoritesCards";
import { UseRecipes } from "../../context/Recipes.context";

const FavsRecipes = () => {
  const { getRecipewithbestscore } = UseRecipes();
  const [favrecipes, setFavRecipes] = useState();

  useEffect(() => {
    const fetchfavrecipes = async () => {
      const res = await getRecipewithbestscore();
      setFavRecipes(res.data);
    };
    fetchfavrecipes();
  }, []);

  return (
    <section id="FavRecipes">
      <header>
        <h2>Favoritas</h2>
      </header>
      <article>
        <FavoritesCards favrecipes={favrecipes}></FavoritesCards>
      </article>
    </section>
  );
};

export default FavsRecipes;
