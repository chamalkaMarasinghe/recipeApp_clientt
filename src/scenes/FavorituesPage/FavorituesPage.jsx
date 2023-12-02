import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RecipeCard from '../../components/RecipeCard';
import Header from '../../components/Header';

function FavorituesPage(props) {

    const { user } = useSelector(state => state.userReducer);
    const [favmeals, setFavMeals] = useState([]);

    const removeRecipe = (recipeId) => {
        try {
            setFavMeals(favmeals.filter((item) => {return item.idMeal != recipeId}));
        } catch (error) {
            console.log(error.message);
        }
    }

    const loadFavMeals = async () => {
        try {
            const localFavMeals = await Promise.all(
                user.favs.map(async (mealId) => {
                    const data = await getMealById(mealId);
                    return data.meals[0];
                })
            );
            //Update the local state with the fetched favMeals
            setFavMeals(localFavMeals);
        } catch (error) {
            console.log(error.message);
        }
    };

    const getMealById = async(mealId) => {
        try {
            const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`, {
                method : "GET",
                "Content-Type" : "Application/json"
            })
            const res = req.json();
            return res;
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        loadFavMeals();
    }, [])

    return (
        <div>
            <Header />
            <br/>
            <div id='recipe-pallate'>
                {
                    Array.from({length: Math.ceil(favmeals.length / 5)}, (_, index) => (
                        <div className='row' key={index}>
                            {
                                favmeals.slice(index * 5, (index + 1) * 5).map((meal, i) => (
                                    <div className='col' key={i}><span onClick={() => {removeRecipe(meal.idMeal)}}><RecipeCard name={meal.strMeal} category={meal.strCategory} recipeId={meal.idMeal} key={i}/></span></div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default FavorituesPage;