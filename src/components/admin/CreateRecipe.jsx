import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { UseCategories } from "../../context/Categories.context";
import { UseRecipes } from "../../context/Recipes.context";

const CreateRecipe = () => {
  const [datacategories, setDataCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const { getCategories, loading } = UseCategories();
  const { createRecipe, UploadRecipeimg } = UseRecipes();
  const [activeStep, setActiveStep] = useState(0);
  const [caterror, setCaterror] = useState(null);
  const [file, setFile] = useState();
  const [fileError, setFileError] = useState();
  const [RecipePicture, setRecipePicture] = useState("");
  const fileInputRef = useRef(null);

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
    setFileError("");
  }, [categoriesSelected, file]);

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

    if (!RecipePicture) {
      setFileError("Debe agregar la foto de la receta");
      return;
    }

    const data = { ...value, categoriesSelected };

    const res = await createRecipe(data);

    let FileName = res.data;

    const PictureData = new FormData();
    PictureData.append("file", file, FileName);

    if (res.status === 200) {
      const end = await UploadRecipeimg(PictureData);
      if (end.status === 200) {
        // AGREGAR ALERTA
        location.reload();
      }
    }
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

  const RecipePicHandler = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setRecipePicture(URL.createObjectURL(selectedFile));
    }
  };

  const getStep = (value) => {
    setActiveStep(value);
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
        <Stepper orientation="vertical" activeStep={activeStep}>
          <Step>
            <StepLabel onClick={() => getStep(0)}>Imagen</StepLabel>
            {fileError ? <p className="error">{fileError}</p> : null}
            <StepContent>
              <div className="">
                <figure className="RecipePicture">
                  <img src={RecipePicture} />
                </figure>
                <Stack direction="row" spacing={2}>
                  <label htmlFor="file-upload">
                    <Button
                      component="span"
                      variant="contained"
                      size="small"
                      style={{ width: "100%" }}
                    >
                      Selecionar foto de la receta
                    </Button>
                  </label>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    style={{ display: "none" }}
                    onChange={RecipePicHandler}
                  />
                </Stack>
              </div>
              <div className="stepperbtn">
                <Button variant="contained" onClick={() => nextStep()}>
                  Siguente
                </Button>
              </div>
            </StepContent>
          </Step>

          <Step>
            <StepLabel onClick={() => getStep(1)}>Informacion</StepLabel>
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
                      type="text"
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
            <StepLabel onClick={() => getStep(2)}>Ingredientes</StepLabel>
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
                        type="text"
                        {...register(`ingredientes.${index}.amount`, {
                          valueAsNumber: false,
                        })}
                      />
                      <Button
                        className="deleteIngredient"
                        type="button"
                        color="error"
                        variant="contained"
                        onClick={() => remove(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
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
            <StepLabel onClick={() => getStep(3)}>
              Intrucciones / Pasos
            </StepLabel>
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
            <StepLabel onClick={() => getStep(4)}>
              Información Nutricional{" "}
            </StepLabel>

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
            <StepLabel onClick={() => getStep(5)}>Categorias</StepLabel>
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
