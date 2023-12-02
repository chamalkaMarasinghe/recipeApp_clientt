import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/action';

function Header(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div id='header-wrapper'>
            <div id='header'>
                <div className='col' id='col-1'>
                    <p>COOK</p>
                    <p className='header-navs' onClick={() => navigate('/')}>Home</p>
                </div>
                <div className='col'>
                    <p className='header-navs' onClick={() => navigate('/fav')}>Favourite</p>
                    <i className="fa-solid fa-right-from-bracket" id='logout' onClick={() => {dispatch(clearUser()); navigate('/login')}}></i>
                </div>
            </div>
        </div>
    );
}

export default Header;