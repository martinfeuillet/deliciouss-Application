import React, { useState, useEffect } from "react";
import { Wrapper, Card, Gradient } from "./styledComponents";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";

function Veggie() {
    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie();
    }, []);
    const getVeggie = async () => {
        const check = localStorage.getItem("veggie");
        if (check) {
            setVeggie(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
            );
            const data = await api.json();
            localStorage.setItem("veggie", JSON.stringify(data.recipes));
            setVeggie(data.recipes);
            console.log(data.recipes);
        }
    };
    return (
        <div>
            <Wrapper>
                <h3>Nos recettes végétariennes</h3>
                <Splide
                    options={{
                        perPage: 3,
                        arrows: false,
                        pagination: false,
                        drag: "free",
                        gap: "3rem",
                    }}
                >
                    {veggie.map((recipe) => (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <Link to={`/recipe/${recipe.id}`}>
                                    <p>{recipe.title}</p>
                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                    />
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

export default Veggie;
