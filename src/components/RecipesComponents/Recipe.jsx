import { useEffect, useState } from "react";
import { UseRecipes } from "../../context/Recipes.context";
import {
  Box,
  Button,
  Rating,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faArrowDown,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { UseUser } from "../../context/user.context";
import { useNavigate, useParams } from "react-router-dom";
import RatingRecipe from "../../../public/images/RatingRecipe.svg";
import { useForm } from "react-hook-form";

const Recipe = (props) => {
  const { getRecipe } = UseRecipes();
  const [recipe, setRecipe] = useState([]);
  const [categories, setCategories] = useState(null);
  const [ingredents, setIngredents] = useState([]);
  const [instructions, setInstruction] = useState([]);
  const [nuts, setNuts] = useState([]);
  const [loginuser, SetLoginUser] = useState();
  const { user, isAuth } = UseUser();

  const Navigate = useNavigate();
  useEffect(() => {
    const fetchgetrecipe = async () => {
      const res = await getRecipe(props.recipeCode);

      if (res.status !== 200) {
        Navigate("/404");
        return;
      }
      console.log();

      let score = 0;

      if (res.data.receta[0].Promedio_Calificacion !== null) {
        score = res.data.receta[0].Promedio_Calificacion;
      }

      const scoreComoNumero =
        typeof score === "string" ? parseFloat(score) : score;

      const recipedata = {
        ImagenURL: res.data.receta[0].ImagenURL,
        id_receta: res.data.receta[0].id_receta,
        Titulo: res.data.receta[0].Titulo,
        Descripcion: res.data.receta[0].Descripcion,
        Tiempo: res.data.receta[0].Tiempo,
        promedio_calificaciones: scoreComoNumero.toFixed(1),
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

  useEffect(() => {
    if (user === undefined) {
      SetLoginUser(null);
      return;
    }
    SetLoginUser(user);
  }, [user]);

  if (recipe === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <ReipeHeader recipe={recipe} categories={categories} />
      <RecipeIngredets ingredents={ingredents} />
      <RecipeInstruction instructions={instructions} />
      <RecipeNutrition nuts={nuts} />
      <Reviews user={loginuser} isAuth={isAuth} />
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
                  <FontAwesomeIcon icon={faClock} />
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
        {props.nuts.map((nuts, i) => (
          <div key={i} className="">
            <h3>{nuts.Value}</h3>
            <p>{nuts.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Reviews = (props) => {
  const [vote, setVote] = useState();
  const [Score, setScore] = useState();
  const [comment, setComment] = useState();
  const [isEditing, setisEditing] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [reviews, setReviews] = useState([]);
  const [visibleReview, setVisibleReview] = useState(4);
  const params = useParams();
  const { getUserScore, getReviews } = UseRecipes();

  useEffect(() => {
    const getScoreData = async () => {
      if (props.user !== null && props.user !== undefined) {
        const res = await getUserScore({
          username: props.user.username,
          recipe_id: params.recipeCode,
        });
        setReviewId(res.data.id);
        setVote(res.data.type);
        setScore(res.data.calificacion);
        setComment(res.data.comentario);
      } else {
        return;
      }
    };
    getScoreData();
  }, [props.user]);

  useEffect(() => {
    const getReviewsData = async () => {
      if (props.user !== null && props.user !== undefined) {
        const res = await getReviews({
          username: props.user.username,
          recipe_id: params.recipeCode,
        });
        setReviews(res.data);
      } else {
        const res = await getReviews({
          username: null,
          recipe_id: params.recipeCode,
        });
        setReviews(res.data);
      }
    };
    getReviewsData();
  }, [props.user]);

  const showMoreReviews = () => {
    setVisibleReview((prevValue) => prevValue + 3);
  };

  return (
    <section id="ReviewsContainer">
      <h2>Opiniones / Reseñas</h2>
      <div>
        <div id="Reviews">
          {props.isAuth ? (
            vote ? (
              <UserOpinion
                score={Score}
                comment={comment}
                setVote={setVote}
                setisEditing={setisEditing}
                reviewId={reviewId}
              />
            ) : (
              <ReviewForm
                user={props.user}
                recipeID={params.recipeCode}
                isEditing={isEditing}
                score={Score}
                setVote={setVote}
                comment={comment}
                reviewId={reviewId}
                setScore={setScore}
                setComment={setComment}
                setReviewId={setReviewId}
              />
            )
          ) : (
            <LoginReviewRecipe recipeID={params.recipeCode} />
          )}
        </div>
      </div>
      <h2 style={{ marginTop: "2rem" }}>Reseñas</h2>
      {reviews.slice(0, visibleReview).map((reviews, i) => (
        <div style={{ paddingBlock: ".5rem" }} key={i}>
          <h4>
            {reviews.name} {reviews.lastname}
          </h4>
          <Rating size="small" readOnly value={Number(reviews.calificacion)} />
          <p>{reviews.comentario}</p>
          <hr style={{ marginTop: "1rem" }} />
        </div>
      ))}
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {visibleReview >= reviews.length ? (
          reviews.length === 0 ? (
            <div>Esta receta aún no tiene reseñas</div>
          ) : reviews.length < visibleReview - 1 ? null : (
            <Button onClick={() => setVisibleReview(4)}>
              Ocultar
              <FontAwesomeIcon
                style={{ marginLeft: "1rem" }}
                icon={faArrowUp}
              />
            </Button>
          )
        ) : (
          <Button onClick={showMoreReviews}>
            Ver más
            <FontAwesomeIcon
              style={{ marginLeft: "1rem" }}
              icon={faArrowDown}
            />
          </Button>
        )}
      </div>
    </section>
  );
};

export const ReviewForm = (props) => {
  const [value, setValue] = useState(0);
  const [error, setError] = useState(null);

  const { setUserScore, updateScore } = UseRecipes();

  useEffect(() => {
    setError(null);
  }, [value]);

  useEffect(() => {
    if (props.isEditing === true) {
      setValue(props.score);
      setValueFromForm("opinion", props.comment);
    }
  }, [props.isEditing]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setValueFromForm,
  } = useForm();

  const handlerRating = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = handleSubmit(async (Formvalue) => {
    const data = {
      username: props.user.username,
      recipe_id: props.recipeID,
      calificacion: value,
      comentario: Formvalue.opinion,
    };
    if (data.calificacion === 0) {
      setError("Agregue una calificación");
      return;
    }
    if (props.isEditing) {
      const newData = {
        calificacion: value,
        comentario: Formvalue.opinion,
        id: props.reviewId,
      };
      const resupdate = await updateScore(newData);
      if (resupdate.status === 200) {
        props.setVote(true);
        props.setScore(newData.calificacion);
        props.setComment(newData.comentario);
      }
    } else {
      const res = await setUserScore(data);
      if (res.status === 200) {
        props.setVote(true);
        props.setScore(data.calificacion);
        props.setComment(data.comentario);
        props.setReviewId(res.data.id);
      }
    }
  });

  const handleCancel = () => {
    if (props.isEditing) {
      props.setVote(true);
    }
  };

  return (
    <section className="Review">
      <div>
        <h2>
          Calificación <span>(Obligatorio)</span>
        </h2>
        {error ? <p className="error">{error}</p> : null}
        <Rating size="large" value={Number(value)} onChange={handlerRating} />
      </div>

      <div className="Opinion">
        <h2>
          Opinion <span>(opcional)</span>
        </h2>
        {errors.opinion && <p className="error">{errors.opinion.message}</p>}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <TextField
            required
            placeholder="¿Qué opinas de la receta? Harías algun cambio o alguna anotación"
            type="text"
            multiline
            variant="outlined"
            minRows={7}
            {...register("opinion", {
              maxLength: {
                value: 255,
                message: "La opinion debe tener maximo 255 caracteres",
              },
            })}
          />
          <Stack spacing={1} direction={"row-reverse"}>
            <Button onClick={() => handleCancel()}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {props.isEditing ? "Editar" : "Enviar"}
            </Button>
          </Stack>
        </Box>
      </div>
    </section>
  );
};

export const UserOpinion = (props) => {
  const editReview = () => {
    props.setVote(false);
    props.setisEditing(true);
  };
  return (
    <section>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: ".5rem",
        }}
      >
        <h3>Mi Opinion</h3>
        <p style={{ fontSize: "12px", color: "gray" }}>ref: {props.reviewId}</p>
      </div>
      <Rating size="medium" readOnly value={Number(props.score)} />
      <p>{props.comment}</p>
      <Button
        onClick={() => editReview()}
        style={{ margin: "8px 0px", padding: "0px" }}
      >
        Editar reseña
      </Button>
    </section>
  );
};

export const LoginReviewRecipe = (props) => {
  const Navigate = useNavigate();
  return (
    <section className="LogintoReview">
      <img src={RatingRecipe} alt="" />
      <p>¿Qué opinas de esta receta? Comparte tu experiencia</p>

      <Button
        onClick={() =>
          Navigate(`/login`, {
            state: { RecipeId: props.recipeID },
          })
        }
        variant="contained"
      >
        Iniciar Sesion
      </Button>
    </section>
  );
};
