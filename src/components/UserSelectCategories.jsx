import { useEffect, useState } from "react";
import { UseCategories } from "../context/Categories.context";
import { UseUser } from "../context/user.context";

const UserSelectCategories = () => {
  const { user, saveusercategory } = UseUser();
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

  const saveCategories = (username, value) => {
    let dietary = [];
    for (let i = 0; i < value.length; i++) {
      dietary.push(value[i].id_categoria);
    }
    saveusercategory(username, dietary);
    console.log(username, dietary);
  };

  return (
    <>
      <div>{user.name} Seleccione sus categorias favoritas</div>
      <div className="Category_Selected">
        <h3> Categorias Selecionadas </h3>
        {selected.map((category) => (
          <div
            className="categoria"
            key={category.id_categoria}
            onClick={() => handleSelect(category)}
          >
            {category.nombre_categoria}
          </div>
        ))}
      </div>
      <div className="Category_Unselected">
        <h3>Categorias</h3>
        {nonselected.map((category) => (
          <div
            className="categoria"
            key={category.id_categoria}
            onClick={() => handleSelect(category)}
          >
            {category.nombre_categoria}
          </div>
        ))}
      </div>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => saveCategories(user.username, selected)}
        >
          Guardar
        </button>
      </div>
    </>
  );
};

export default UserSelectCategories;
