import { SET_USER, CLEAR_USER, ADD_REMOVE_RECIPE } from "./action";

const initialState = {
    user : null,
    token : null
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return { ...state, user : action.payload.user, token : action.payload.token};
        case CLEAR_USER:
            return {...state, user : action.payload, token : action.payload};
        case ADD_REMOVE_RECIPE:
            return {...state, 
                user : {
                    ...state.user,
                    ...action.payload
                }
            }
        default:
            return state;
    }

}

export default userReducer