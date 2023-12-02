export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const ADD_REMOVE_RECIPE = "ADD_REMOVE_RECIPE";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const clearUser = () => {
    return {
        type: CLEAR_USER,
        payload: null
    }
};

export const addRemoveRecipe = (updatedRecipeList) => {
    return { 
        type: ADD_REMOVE_RECIPE,
        payload: updatedRecipeList
    }
}