import Slider from "react-slick";

const RecipesCategorieCard = ({ categories }) => {
  // THE IDEA HERE IS TO ADD A USEEFFECT IN ORDER TO GET THE INFORMATION FROM THE PROPS THAT I WAS SENDING, OR JUST ADD A LOADING IN THE PATHER COMPONENTE
  // TO AVOID UNDIFINED
  //   console.log(categories);

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
  };
  return (
    <div className="categoriesHomeContainer slider-container">
      <Slider {...settings}>
        {categories.map((categories, idx) => (
          <div className="CategorieName" key={idx}>
            {categories.name}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecipesCategorieCard;
