import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { UseCategories } from "../../context/Categories.context";
import { UseRecipes } from "../../context/Recipes.context";

const CreateRecipe = () => {
  const [datacategories, setDataCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const { getCategories, loading } = UseCategories();
  const { createRecipe } = UseRecipes();
  const [activeStep, setActiveStep] = useState(0);
  const [caterror, setCaterror] = useState(null);

  useEffect(() => {
    const FetchinData = async () => {
      const res = await getCategories();
      setDataCategories(res.data);
    };
    FetchinData();
  }, []);

  useEffect(() => {
    if (categoriesSelected.length !== 0) {
      setCaterror(null);
    }
  }, [categoriesSelected]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    defaultValues: {
      ingredientes: [{ name: "", amount: 1 }],
      Pasos: [{ name: "" }],
      NutInfo: [
        { name: "Calorias", Value: undefined },
        { name: "Grasas", Value: undefined },
        { name: "Carbohidratos", Value: undefined },
        { name: "Proteinas", Value: undefined },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredientes",
    control,
    rules: {
      require: "Ingrese como minimo un ingrediente",
    },
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    name: "Pasos",
    control,
    rules: {
      require: "Ingrese como mínimo un Paso",
    },
  });

  const { fields: NutInfoFields } = useFieldArray({
    name: "NutInfo",
    control,
    rules: {
      require: "Ingrese como minimo un valor nutricional",
    },
  });

  if (loading === 0) {
    return <h1>...Loading</h1>;
  }

  const onSubmit = handleSubmit(async (value) => {
    if (value.Pasos.length === 0) {
      setError("Pasos");
      return;
    }
    if (value.ingredientes.length === 0) {
      setError("ingredientes");
      return;
    }
    for (let i = 0; i < value.NutInfo.length; i++) {
      const element = value.NutInfo[i].Value;
      if (element === "") {
        setError("NutInfo");
        return;
      }
    }
    if (categoriesSelected.length === 0) {
      setCaterror(true);
      return;
    } else {
      setCaterror(null);
    }

    const data = { ...value, categoriesSelected };

    const res = await createRecipe(data);
    console.log(res);
  });

  const setRecipeCategories = (index) => {
    const NewCategorySelected = datacategories.filter(
      (category) => category.id_categoria === index
    );

    const isCategorySelected = categoriesSelected.some(
      (category) => category.id_categoria === index
    );

    if (isCategorySelected) {
      setCategoriesSelected((prevCategories) =>
        prevCategories.filter((category) => category.id_categoria !== index)
      );
    } else {
      setCategoriesSelected([...categoriesSelected, ...NewCategorySelected]);
    }
  };

  const isCategorySelected = (categoryId) => {
    return categoriesSelected.some(
      (category) => category.id_categoria === categoryId
    );
  };
  const nextStep = async () => {
    setActiveStep(activeStep + 1);
  };
  const previusStep = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        className="CreateRecipeForm"
        onSubmit={onSubmit}
      >
        {}
        <Stepper orientation="vertical" activeStep={activeStep}>
          <Step>
            <StepLabel>Imagen</StepLabel>
            <StepContent>
              <div className="stepperbtn">
                <Button onClick={() => previusStep()}>Anterior</Button>
                <Button variant="contained" onClick={() => nextStep()}>
                  Siguente
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Informacion</StepLabel>
            {errors.Titulo && <p className="error">{errors.Titulo.message}</p>}
            {errors.tiempo && <p className="error">{errors.tiempo.message}</p>}
            {errors.descripcion && (
              <p className="error">{errors.descripcion.message}</p>
            )}
            <StepContent>
              <section className="RecipeForm">
                <div className="recipename-time-form">
                  <div className="recipename">
                    <TextField
                      required
                      label="Nombre de la receta"
                      type="text"
                      {...register("Titulo", {
                        required: {
                          value: true,
                          message: "El nombre de la receta es requerido",
                        },
                      })}
                    />
                  </div>
                  <div className="recipetime">
                    <TextField
                      required
                      label="Duración"
                      type="number"
                      {...register("tiempo", {
                        required: {
                          value: true,
                          message: "el Tiempo requerido",
                        },
                        min: {
                          value: 2,
                          message: "La receta debe ser de minimo 2 minutos",
                        },
                      })}
                    />
                  </div>
                </div>
              </section>

              <section className="descriptionform">
                <div>
                  <TextField
                    required
                    label="Descripcion"
                    type="text"
                    multiline
                    minRows={4}
                    {...register("descripcion", {
                      required: {
                        value: true,
                        message: "La descripcion requerido",
                      },
                      maxLength: {
                        value: 255,
                        message:
                          "La descipción debe tener maximo 255 caracteres",
                      },
                    })}
                  />
                </div>
              </section>
              <div className="stepperbtn">
                <Button onClick={() => previusStep()}>Anterior</Button>
                <Button variant="contained" onClick={() => nextStep()}>
                  Siguente
                </Button>
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Ingredientes</StepLabel>
            {errors.ingredientes && (
              <p className="error">Los ingredientes Son requeridos</p>
            )}
            <StepContent>
              <section className="Ingredientes">
                {fields.map((field, index) => {
                  return (
                    <section className="ingredetns" key={field.id}>
                      <TextField
                        required
                        label="Ingrediente"
                        type="text"
                        {...register(`ingredientes.${index}.name`, {
                          required: {
                            value: true,
                            message: "Los ingredientes son requeridos",
                          },
                        })}
                      />
                      <TextField
                        required
                        label="Cantidad"
                        type="number"
                        {...register(`ingredientes.${index}.amount`, {
                          valueAsNumber: true,
                        })}
                      />
                      <Button
                        className="deleteIngredient"
                        type="button"
                        color="error"
                        variant="contained"
                        onClick={() => remove(index)}
                      >
                        <FontAwesomeIcon
                          className="SearchIcon"
                          icon={faTrash}
                        />
                      </Button>
                    </section>
                  );
                })}
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => {
                    append({
                      name: "",
                      amount: 1,
                    });
                  }}
                >
                  +
                </Button>
              </section>
              <div className="stepperbtn">
                <Button onClick={() => previusStep()}>Anterior</Button>
                <Button variant="contained" onClick={() => nextStep()}>
                  Siguente
                </Button>
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Intrucciones / Pasos</StepLabel>
            {errors.Pasos && <p className="error">Los Pasos Son requeridos</p>}
            <StepContent>
              <section className="Pasos">
                {stepFields.map((field, index) => {
                  return (
                    <section className="ingredetns" key={field.id}>
                      <TextField
                        required
                        label="Pasos"
                        type="text"
                        {...register(`Pasos.${index}.name`, {
                          required: true,
                        })}
                      />
                      <Button
                        className="deleteIngredient"
                        type="button"
                        color="error"
                        variant="contained"
                        onClick={() => removeStep(index)}
                      >
                        <FontAwesomeIcon
                          className="SearchIcon"
                          icon={faTrash}
                        />
                      </Button>
                    </section>
                  );
                })}
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => {
                    appendStep({
                      name: "",
                    });
                  }}
                >
                  +
                </Button>
              </section>
              <div className="stepperbtn">
                <Button onClick={() => previusStep()}>Anterior</Button>
                <Button variant="contained" onClick={() => nextStep()}>
                  Siguente
                </Button>
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Información Nutricional </StepLabel>

            {errors.NutInfo && (
              <p className="error">Los valores son requeridos</p>
            )}
            <StepContent>
              <section className="InfoNut">
                {NutInfoFields.map((field, index) => {
                  return (
                    <section className="ingredetns" key={field.id}>
                      <TextField
                        required
                        label="Información Nutricional"
                        type="text"
                        inputProps={{
                          readOnly: true,
                        }}
                        {...register(`NutInfo.${index}.name`)}
                      />
                      <TextField
                        required
                        label="Información Nutricional"
                        type="text"
                        {...register(`NutInfo.${index}.Value`, {
                          required: true,
                        })}
                      />
                    </section>
                  );
                })}
              </section>
              <div className="stepperbtn">
                <Button onClick={() => previusStep()}>Anterior</Button>
                <Button variant="contained" onClick={() => nextStep()}>
                  Siguente
                </Button>
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>Categorias</StepLabel>
            {caterror ? (
              <p className="error">Selecione al menos una categoria</p>
            ) : null}
            <StepContent>
              <section>
                <div className="categories">
                  {datacategories.map((categories, i) => (
                    <div
                      className={`Catvalue ${
                        isCategorySelected(categories.id_categoria)
                          ? "selected"
                          : ""
                      }`}
                      key={i}
                      onClick={() =>
                        setRecipeCategories(categories.id_categoria)
                      }
                    >
                      {categories.nombre_categoria}
                    </div>
                  ))}
                </div>

                <div className="stepperbtn">
                  <Button onClick={() => previusStep()}>Anterior</Button>
                  <Button variant="contained" type="submit">
                    Registrar Receta
                  </Button>
                </div>
              </section>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </>
  );
};

export default CreateRecipe;
