import { useEffect, useState } from "react";
import { UseCategories } from "../context/Categories.context";
import { UseUser } from "../context/user.context";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const UserSelectCategories = () => {
  const { user, saveusercategory, loading: userLoading, loginUser } = UseUser();
  const { getCategories, categories, loading } = UseCategories();

  const [nonselected, setNonselected] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const filteredNonselected = categories.filter(
        (category) =>
          !selected.some(
            (selectedCategory) =>
              selectedCategory.id_categoria === category.id_categoria
          )
      );
      setNonselected(filteredNonselected);
    }
  }, [categories, selected]);

  if (userLoading) {
    return <h1>Loading...</h1>;
  }

  const handleSelect = (category) => {
    const indexNonselected = nonselected.indexOf(category);
    if (indexNonselected !== -1) {
      const updatedNonselected = nonselected.filter((c) => c !== category);
      setNonselected(updatedNonselected);
      setSelected([...selected, category]);
    } else {
      const indexSelected = selected.indexOf(category);
      if (indexSelected !== -1) {
        const updatedSelected = selected.filter((c) => c !== category);
        setSelected(updatedSelected);
        setNonselected([...nonselected, category]);
      }
    }
  };

  if (loading === true || !nonselected) {
    return <div>Loading...</div>;
  }

  const login = (username, password) => {
    loginUser({ username: username, password: password });
  };

  const saveCategories = (username, value, password) => {
    let dietary = [];
    for (let i = 0; i < value.length; i++) {
      dietary.push(value[i].id_categoria);
    }
    saveusercategory(username, dietary);
    login(username, password);

    console.log(username, dietary);
  };

  return (
    <section className="user_categories">
      <div className="Titleuser_category">
        <h1>
          <span> {user.name} </span>Seleccione sus categorias favoritas
        </h1>
      </div>
      <div className="Category_Selected">
        <h3> Categorias Selecionadas </h3>
        {selected.length === 0 ? (
          <p>No hay categorías seleccionadas</p>
        ) : (
          selected.map((category) => (
            <div
              className="categoria"
              key={category.id_categoria}
              onClick={() => handleSelect(category)}
            >
              {category.nombre_categoria}
            </div>
          ))
        )}
      </div>
      <div className="Category_Unselected">
        <h3>Categorias</h3>
        {nonselected.length === 0 ? (
          <p>No hay categorías disponibles</p>
        ) : (
          nonselected.map((category) => (
            <div
              className="categoria"
              key={category.id_categoria}
              onClick={() => handleSelect(category)}
            >
              {category.nombre_categoria}
            </div>
          ))
        )}
      </div>
      <div>
        <Stack className="btns_category" spacing={2} direction="row">
          <Button
            variant="contained"
            className="btn btn-primary btn-category"
            onClick={() =>
              saveCategories(user.username, selected, user.password)
            }
          >
            Guardar
          </Button>
          <Button
            variant="outlined"
            className="btn btn-primary btn-category"
            onClick={() => login(user.username, user.password)}
          >
            Omitir
          </Button>
        </Stack>
      </div>
    </section>
  );
};

export default UserSelectCategories;
