import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipesComponents/RecipeCard";

const Home = () => {
  return (
    <div className="homepagerecipes">
      <Navbar className="NavbarHome" />
      <RecipeCard id="RecipesContainer"></RecipeCard>
    </div>
  );
};

export default Home;
