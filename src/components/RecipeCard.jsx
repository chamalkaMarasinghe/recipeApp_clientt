import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addRemoveRecipe } from '../redux/action';

function RecipeCard(props) {

    const { user, token } = useSelector(state => state.userReducer);
    // const { token } = useSelector(state => state.token)};
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addFavs = async(recipeId) => {
        try {
            if(!user){
                navigate('/login');
            }

            if(user.favs.includes(recipeId)){
                dispatch(addRemoveRecipe({
                    favs : user.favs.filter((item) => {return item != recipeId})
                }));
            }
            else{
                dispatch(addRemoveRecipe({favs : [...user.favs, recipeId]}));
            }

            await fetch(`https://worried-gold-goshawk.cyclic.app/auth/user/${user._id}/recipe/${recipeId}`, {
                method : "PATCH",
                headers : {"Content-Type" : "Application/json", "Authorization" : token}
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div id='recipe-card'>
            <div id='image'>
                recipe image
            </div>
            <div id='desc'>
                {
                    user ?
                    user.favs.includes(props.recipeId) ?
                    <p id='category'>{props.category} <i className="fa-solid fa-heart" style={{color: "#fe0606"}} onClick={() => {addFavs(props.recipeId)}}></i></p> :
                    <p id='category'>{props.category} <i className="fa-regular fa-heart" onClick={() => {addFavs(props.recipeId)}}></i></p> :
                    <p id='category'>{props.category} <i className="fa-regular fa-heart" onClick={() => {addFavs(props.recipeId)}}></i></p>

                }
                <p id='name'>{props.name}</p>
            </div>
        </div>
    );
}

export default RecipeCard;