import React,{useState,useEffect} from 'react'
import {useParams,Link} from 'react-router-dom'
import {Grid, Card2 } from '../Components/styledComponents'


function Searched() {
    const [searchRecipes, setSearchRecipes] = useState([])
    let params = useParams()

    const getSearched = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=10`)
        const recipes = await data.json()
        setSearchRecipes(recipes.results)
    }
    useEffect(()=>{
        getSearched(params.search)
    },[params.search])
  return (
    <Grid>
        {searchRecipes.map(item => (
            <Card2 key={item.id}>
              <Link to={`/recipe/${item.id}`}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card2>
        ))}
    </Grid>
  )
}

export default Searched