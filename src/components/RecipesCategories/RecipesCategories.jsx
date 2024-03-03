import RecipesCategorieCard from "./RecipesCategorieCard";

const RecipesCategories = () => {
  // THE IDEA HERE IS TO FETCH THE INFORMATION FROM THE CATEGORIES LIST IN THE DATABASES
  // THIS IS JUST AN EXAMPLE

  const categories = [
    {
      id: 1,
      name: "Appetizers",
    },
    {
      id: 2,
      name: "Main Dishes",
    },
    {
      id: 3,
      name: "Desserts",
    },
    {
      id: 4,
      name: "Salads",
    },
    {
      id: 5,
      name: "Soups",
    },
    {
      id: 6,
      name: "Beverages",
    },
    {
      id: 7,
      name: "Breads",
    },
    {
      id: 8,
      name: "Breakfast",
    },
    {
      id: 9,
      name: "Lunch",
    },
    {
      id: 10,
      name: "Dinner",
    },
  ];

  return (
    <section id="Categories">
      <h2>Categorias</h2>

      <RecipesCategorieCard categories={categories} />
    </section>
  );
};

export default RecipesCategories;
