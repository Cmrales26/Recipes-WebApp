import { useEffect, useState } from "react";
import { getPopular } from "../api/Recipes";

const Popular = () => {
  const [recipy, setRecipy] = useState([]);

  useEffect(() => {
    const Populardata = async () => {
      try {
        const data = await getPopular();
        setRecipy(data);
        console.log(data);
      } catch (error) {
        console.error("Error at fetching data", error);
      }
    };
    Populardata();
  }, []);

  return (
    <>
      <section className="popular">
        {/* <Splide> */}
        <div className="popular-wrapper">
          <h3>Popular Picks</h3>
          {recipy.map((recipes) => {
            return recipes.title;
          })}
        </div>
        {/* </Splide> */}
      </section>
    </>
  );
};

export default Popular;
