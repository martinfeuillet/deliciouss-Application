import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailWrapper, Button, Info } from "../Components/styledComponents";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async () => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        const detailData = await data.json();
        setDetails(detailData);
    };
    useEffect(() => {
        fetchDetails();
    }, [params.name]);
    console.log(details);
    return (
        <DetailWrapper>
            <div>
                <h1>{details.title}</h1>
                <img src={details.image} alt="" />
            </div>
            <Info>
                <Button
                    className={activeTab === "instructions" ? "active" : ""}
                    onClick={() => setActiveTab("instructions")}
                >
                    Instructions
                </Button>
                <Button
                    className={activeTab === "ingredients" ? "active" : ""}
                    onClick={() => setActiveTab("ingredients")}
                >
                    Ingredients
                </Button>
                {activeTab === "instructions" && (
                    <div>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: details.summary,
                            }}
                        ></h3>
                        <h3
                            dangerouslySetInnerHTML={{
                                __html: details.instructions,
                            }}
                        ></h3>
                    </div>
                )}
                {activeTab === "ingredients" && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    );
}

export default Recipe;
