import { useEffect, useState } from "react";
import { UseRecipes } from "../../context/Recipes.context";
import { Box, Rating, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import PageController from "./PageController";

const RecipeCard = () => {
  const { getRecipes } = UseRecipes();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [initRange, setInitRange] = useState(0);
  const [lastRange, setLastRange] = useState(6);
  const numofsteps = 6;

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
      <div className="recipes-header">
        <h1>RECETAS</h1>
        <a href="#">
          Ver todo <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
      <div className="recipes">
        {recipeData.slice(initRange, lastRange).map((recipe, index) => (
          <div
            key={index}
            className="Recipescard"
            onClick={() => {
              window.location.href = `/recipe/${recipe.id_receta}`;
            }}
          >
            <figure>
              <img
                loading="lazy"
                src={recipe.ImagenURL}
                alt={`Imagen de ${recipe.Titulo}`}
              />
            </figure>
            <div className="Card-Content">
              <div className="title">
                <h2>{recipe.Titulo}</h2>
              </div>
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
                <div className="time">
                  <FontAwesomeIcon icon={faClock} /> {""}
                  {recipe.Tiempo}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PageController
        page={page}
        initRange={initRange}
        lastRange={lastRange}
        recipeData={recipeData}
        numofsteps={numofsteps}
        setInitRange={setInitRange}
        setLastRange={setLastRange}
        setPage={setPage}
      ></PageController>
    </section>
  );
};

export default RecipeCard;
