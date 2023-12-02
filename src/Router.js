import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./scenes/HomePage/Home";
import FavorituesPage from "./scenes/FavorituesPage/FavorituesPage";
import Login from "./scenes/LoginPage/Login";
import Register from "./scenes/RegisterPage/Register";

export default function Router(){

    const { user } = useSelector(state => state.userReducer);

    return(
        <Routes>
            <Route path="/recipeApp_clientt" element={<Home />} />
            <Route path="/fav" element={user ? <FavorituesPage /> : <Login />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/register" element={user ? <Home /> : <Register />} />
        </Routes>
    );
}
