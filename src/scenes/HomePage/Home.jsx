import React, { useEffect, useState } from 'react';
//import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import RecipeCard from '../../components/RecipeCard';

function Home(props) {

    //use location is used to pass data through useNavigate within pasges(for read the data have passed)
    //const location = useLocation();
    // const { user } = location.state || {};
    const { user } = useSelector(state => state.userReducer);
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("Beef");
    const [meals, setMeals] = useState([]);


    const loadCategories = async() => {
        const req = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php", {
            "method" : "GET",
            "Content-Type" : "Application/json",
        });
        const res = req.json();
        return res;
    }

    const getMealsByCategory = async(category) => {
        await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`, {
            "method" : "GET",
            "Content-Type" : "Application/json",
        })
        .then(function(response) {return response.json()})
	    .then(data => setMeals(data.meals))
    }

    useEffect(() => {
        loadCategories().then((res) => {setCategories(res.categories); getMealsByCategory(res.categories[0].strCategory)})
    }, [])

    const numberOfVerticalRows = Math.ceil(meals.length / 5);

    return (
        <div>
            <Header />
            <div id='category-pallate'>
                {
                    categories.map((category, index) => {
                        return(
                            currentCategory == category.strCategory ? 
                            <button className='category-btns highlighted' key={index} onClick={() => {setCurrentCategory(category.strCategory); getMealsByCategory(category.strCategory)}}>{category.strCategory}</button>
                            :
                            <button className='category-btns' key={index} onClick={() => {setCurrentCategory(category.strCategory); getMealsByCategory(category.strCategory)}}>{category.strCategory}</button>
                        );
                    })
                }
            </div>
            <div id='recipe-pallate'>
                {
                    Array.from({length: numberOfVerticalRows}, (_, index) => (
                        <div className='row' key={index}>
                            {
                                meals.slice(index * 5, (index + 1) * 5).map((meal, i) => (
                                    <div className='col' key={i}> <RecipeCard name={meal.strMeal} category={currentCategory} recipeId={meal.idMeal} key={i}/> </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;