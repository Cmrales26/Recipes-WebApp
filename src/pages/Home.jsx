import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipesComponents/RecipeCard";
import { UseUser } from "../context/user.context";
import { useEffect } from "react";

const Home = () => {
  const { user, isAuth } = UseUser();
  const Navigate = useNavigate();

  useEffect(() => {
    if (isAuth && user.rol === "admin") {
      Navigate("/admin");
    }
  }, []);

  return (
    <div className="homepagerecipes">
      <Navbar className="NavbarHome" />
      <RecipeCard id="RecipesContainer"></RecipeCard>
    </div>
  );
};

export default Home;
