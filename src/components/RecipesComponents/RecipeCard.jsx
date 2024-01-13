import { useEffect, useState } from "react";
import { UseRecipes } from "../../context/Recipes.context";
import { Box, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RecipeCard = () => {
  const Navigate = useNavigate();
  const { getRecipes } = UseRecipes();
  const [loading, setLoading] = useState(true);
  const [recipeData, setRecipeData] = useState(null);
  useEffect(() => {
    const getdata = async () => {
      const data = await getRecipes();
      setRecipeData(data.data);
      setLoading(false);
    };
    getdata();
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <section className="recipes-Section">
      <h1>RECETAS</h1>
      <div className="recipes">
        {recipeData.map((recipe, index) => (
          <div
            key={index}
            className="Recipescard"
            onClick={() => Navigate(`/recipe/${recipe.id_receta}`)}
          >
            <figure>
              <img src={recipe.ImagenURL} alt={`Imagen de ${recipe.Titulo}`} />
            </figure>
            <div className="Card-Content">
              <h2>{recipe.Titulo}</h2>
              <p>{recipe.descripcion}</p>
              <div className="score-time">
                <div className="score">
                  <Box>
                    <Rating
                      name="simple-controlled"
                      value={parseFloat(recipe.promedio_calificaciones)}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                </div>
                <div className="time">{recipe.Tiempo}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecipeCard;
