import { useEffect, useState } from "react";
import { UseRecipes } from "../../context/Recipes.context";
import { Box, IconButton, Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const Recipe = (props) => {
  const { getRecipe } = UseRecipes();
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    const fetchgetrecipe = async () => {
      const res = await getRecipe(props.recipeCode);
      setRecipe(res.data.receta);
      setCategories(
        res.data.categorias.map((categoria) => categoria.nombre_categoria)
      );
    };
    fetchgetrecipe();
  }, []);
  if (recipe === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="recipeContainer">
        {recipe.map((recipeinfo, index) => (
          <div className="" key={index}>
            <figure className="RecipeimgContainer">
              <img src={recipeinfo.ImagenURL} alt="Imagen" />
            </figure>
            <div className="maincontent">
              {console.log(recipeinfo)}
              <div className="info">
                <h1>{recipeinfo.Titulo}</h1>
                <p>{recipeinfo.descripcion}</p>

                <div className="categories">
                  {categories.map((categories, index) => (
                    <div className="RecipeCategory" key={index}>
                      {categories}
                    </div>
                  ))}
                </div>
                <div className="Starandtime">
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={parseFloat(recipeinfo.promedio_calificaciones)}
                      precision={0.5}
                      readOnly
                    />
                    <Box sx={{ ml: 2 }}>
                      {recipeinfo.promedio_calificaciones}
                    </Box>
                  </Box>
                  <div className="Time">
                    <FontAwesomeIcon className="SearchIcon" icon={faClock} />
                    <p> {recipeinfo.Tiempo}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=""></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Recipe;
