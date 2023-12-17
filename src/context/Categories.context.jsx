import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { getCategoryReques } from "../api/Categories";

export const Categoriescontext = createContext();

export const UseCategories = () => {
  const context = useContext(Categoriescontext);
  if (!context) {
    throw new Error("categoriescontext must be used in a categoriescontext");
  } else {
    return context;
  }
};

export const CategoriesProvider = ({ children }) => {
  //   const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const res = await getCategoryReques();
      setCategories(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Categoriescontext.Provider
      value={{ categories, loading, setCategories, getCategories }}
    >
      {children}
    </Categoriescontext.Provider>
  );
};

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
