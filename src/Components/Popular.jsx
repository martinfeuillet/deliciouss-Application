import React, { useEffect, useState } from "react";
import { Wrapper, Card, Gradient } from './styledComponents'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { Link } from "react-router-dom";

function Popular() {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        getPopular();
    }, []);
    const getPopular = async () => {
        const check = localStorage.getItem("popular");

        if (check) {
            setPopular(JSON.parse(check));
        }else{
          const api = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
        );
        const data = await api.json();
        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setPopular(data.recipes);
        console.log(data.recipes);
        }
    };
    return (
        <div>
            <Wrapper>
                <h3>Recettes populaires</h3>
                <Splide
                    options={{
                        perPage: 4,
                        arrows: false,
                        pagination: false,
                        drag: "free",
                        gap: "3rem",
                    }}
                >
                    {popular.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <Card>
                            <Link to={`/recipe/${recipe.id}`}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient />
                            </Link>
                            </Card>
                        </SplideSlide>
                    ))}
                </Splide>
            </Wrapper>
        </div>
    );
}

export default Popular;
