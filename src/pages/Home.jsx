import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipesComponents/RecipeCard";
import FavRecipes from "../components/favs/FavsRecipes";
import { UseUser } from "../context/user.context";
import { useEffect } from "react";
import RecipesCategories from "../components/RecipesCategories/RecipesCategories";

const Home = () => {
  const { user, isAuth } = UseUser();
  const Navigate = useNavigate();

  useEffect(() => {
    if (isAuth && user.rol === "admin") {
      Navigate("/admin");
    }
    console.log(user);
  }, [isAuth]);

  return (
    <div className="homepagerecipes">
      <Navbar className="NavbarHome" />
      <FavRecipes></FavRecipes>
      <RecipesCategories></RecipesCategories>
      <RecipeCard id="RecipesContainer"></RecipeCard>
    </div>
  );
};

export default Home;
