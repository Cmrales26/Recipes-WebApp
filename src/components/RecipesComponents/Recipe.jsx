import { useEffect, useState } from "react";
import { UseRecipes } from "../../context/Recipes.context";
import { Box, Rating, Step, StepLabel, Stepper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const Recipe = (props) => {
  const { getRecipe } = UseRecipes();
  const [recipe, setRecipe] = useState([]);
  const [categories, setCategories] = useState(null);
  const [ingredents, setIngredents] = useState([]);
  const [instructions, setInstruction] = useState([]);
  const [nuts, setNuts] = useState([]);
  useEffect(() => {
    const fetchgetrecipe = async () => {
      const res = await getRecipe(props.recipeCode);

      const recipedata = {
        ImagenURL: res.data.receta[0].ImagenURL,
        id_receta: res.data.receta[0].id_receta,
        Titulo: res.data.receta[0].Titulo,
        Descripcion: res.data.receta[0].Descripcion,
        Tiempo: res.data.receta[0].Tiempo,
      };
      setIngredents(res.data.receta[0].ingredientes);
      setInstruction(res.data.receta[0].instrucciones);
      setNuts(res.data.receta[0].nutrientes);
      setRecipe([recipedata]);
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
      <ReipeHeader recipe={recipe} categories={categories} />
      <RecipeIngredets ingredents={ingredents} />
      <RecipeInstruction instructions={instructions} />
      <RecipeNutrition nuts={nuts} />
      <Reviews />
    </>
  );
};

export default Recipe;

export const ReipeHeader = (props) => {
  return (
    <div className="recipeContainer">
      {props.recipe.map((recipeinfo, index) => (
        <div className="" key={index}>
          <figure className="RecipeimgContainer">
            <img src={recipeinfo.ImagenURL} alt="Imagen" />
          </figure>
          <div className="maincontent">
            <div className="info">
              <div className="maininfo">
                <h1>{recipeinfo.Titulo}</h1>
                <p>{recipeinfo.Descripcion}</p>
              </div>

              <div className="categories">
                {props.categories.map((categories, index) => (
                  <div className="RecipeCategory" key={index}>
                    {categories}
                  </div>
                ))}
              </div>
              <div className="Starandtime">
                <a href="#Reviews">
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <Rating
                      className="starts"
                      name="simple-controlled"
                      value={parseFloat(recipeinfo.promedio_calificaciones)}
                      precision={0.5}
                      readOnly
                    />

                    <Box className="ScoreMean" sx={{ ml: 2 }}>
                      {recipeinfo.promedio_calificaciones === undefined ? (
                        <p>0.0</p>
                      ) : (
                        recipeinfo.promedio_calificaciones
                      )}
                    </Box>
                  </Box>
                </a>
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
  );
};

export const RecipeIngredets = (props) => {
  return (
    <section className="IngredentsContainer">
      <h2>Ingredientes</h2>
      {props.ingredents.map((ingredents, i) => (
        <div key={i} className="ingredents">
          <p>{ingredents.name}</p>
          <p>{ingredents.amount}</p>
        </div>
      ))}
    </section>
  );
};

export const RecipeInstruction = (props) => {
  return (
    <section className="IntructionsContainer">
      <h2>Instrucciones / Pasos</h2>
      <Stepper orientation="vertical" className="StepperInstruction">
        {props.instructions.map((instruction, i) => (
          <Step key={i} active={true}>
            <StepLabel>{instruction.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </section>
  );
};

export const RecipeNutrition = (props) => {
  return (
    <section className="Nutritional">
      <h2>
        Valores Nutricionales <span>(Aproximado)</span>
      </h2>
      <div className="NutsTable">
        {props.nuts.map((nuts) => (
          <div className="">
            <h3>{nuts.Value}</h3>
            <p>{nuts.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Reviews = () => {
  return <section id="Reviews">Opinones</section>;
};
