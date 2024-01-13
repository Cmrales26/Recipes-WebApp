import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { UseCategories } from "../../context/Categories.context";

const CreateRecipe = () => {
  const [datacategories, setDataCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const { getCategories, loading } = UseCategories();

  useEffect(() => {
    const FetchinData = async () => {
      const res = await getCategories();
      setDataCategories(res.data);
    };
    FetchinData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      ingredientes: [{ name: "", amount: 1 }],
      Pasos: [{ name: "" }],
      NutInfo: [
        { name: "Calorias", Value: 0 },
        { name: "Grasas", Value: 0 },
        { name: "Carbohidratos", Value: 0 },
        { name: "Proteinas", Value: 0 },
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

  const {
    fields: NutInfoFields,
    append: appendNutInfo,
    remove: removeNutInfo,
  } = useFieldArray({
    name: "NutInfo",
    control,
    rules: {
      require: "Ingrese como mínimo un Paso",
    },
  });

  if (loading === 0) {
    return <h1>...Loading</h1>;
  }

  const onSubmit = handleSubmit((value) => {
    console.log(value);
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
  return (
    <>
      {/* {console.log(categories)} */}
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
        <section className="RecipeForm">
          <details open name="Form-recipe">
            <summary>Información de la receta</summary>
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
                      message: "La descripcion requerido",
                    },
                    min: {
                      value: 2,
                      message: "La receta debe ser de minimo 2 minutos",
                    },
                  })}
                />
              </div>
            </div>
          </details>
        </section>

        <section className="descriptionform">
          <details open>
            <summary>Descripcion</summary>
            <div>
              <TextField
                required
                label="Descripcion"
                type="text"
                multiline
                minRows={4}
                {...register("descipcion", {
                  required: {
                    value: true,
                    message: "La descripcion requerido",
                  },
                  maxLength: {
                    value: 255,
                    message: "La descipción debe tener maximo 255 caracteres",
                  },
                })}
              />
            </div>
          </details>
        </section>

        <section className="Ingredientes">
          <details open>
            <summary>Ingredientes</summary>
            {fields.map((field, index) => {
              return (
                <section className="ingredetns" key={field.id}>
                  <TextField
                    required
                    label="Ingrediente"
                    type="text"
                    {...register(`ingredientes.${index}.name`)}
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
                    <FontAwesomeIcon className="SearchIcon" icon={faTrash} />
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
          </details>
        </section>

        <section className="Pasos">
          <details open>
            <summary>Pasos</summary>
            {stepFields.map((field, index) => {
              return (
                <section className="ingredetns" key={field.id}>
                  <TextField
                    required
                    label="Pasos"
                    type="text"
                    {...register(`Pasos.${index}.name`)}
                  />
                  <Button
                    className="deleteIngredient"
                    type="button"
                    color="error"
                    variant="contained"
                    onClick={() => removeStep(index)}
                  >
                    <FontAwesomeIcon className="SearchIcon" icon={faTrash} />
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
          </details>
        </section>

        <section className="InfoNut">
          <details open>
            <summary>Información Nutricional</summary>
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
                    {...register(`NutInfo.${index}.Value`)}
                  />
                </section>
              );
            })}
          </details>
        </section>
        <details open>
          <summary>Categorias</summary>
          <section className="categories">
            {datacategories.map((categories, i) => (
              <div
                className={`Catvalue ${
                  isCategorySelected(categories.id_categoria) ? "selected" : ""
                }`}
                key={i}
                onClick={() => setRecipeCategories(categories.id_categoria)}
              >
                {categories.nombre_categoria}
              </div>
            ))}
          </section>
        </details>
        <Stack style={{ padding: "2rem" }}>
          <Button variant="contained" type="submit">
            Registrar Receta
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default CreateRecipe;
