import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FavoritesCards = (favrecipes) => {
  const [loading, setLoading] = useState(true);
  const [recipeinfo, setRecipeInfo] = useState();

  useEffect(() => {
    if (favrecipes.favrecipes != undefined) {
      setLoading(false);
      setRecipeInfo(favrecipes.favrecipes);
    }
  }, [favrecipes]);

  if (loading) {
    return;
  }

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {recipeinfo.map((recipe, idx) => (
          <div
            className="Favrecipe"
            key={idx}
            onDoubleClick={() => {
              alert("Hola");
            }}
          >
            <img
              src={recipe.ImagenURL}
              alt={`Imagen de receta ${recipe.Titulo}`}
            />
            <div className="info">
              <p className="recipenave">{recipe.Titulo}</p>
              <div className="scorefavrecipe">
                <img
                  src="https://static-00.iconduck.com/assets.00/star-icon-512x512-vyury549.png"
                  alt="Estrella de receta favorita"
                />
                <p className="grade">
                  {parseFloat(recipe.promedio).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FavoritesCards;
