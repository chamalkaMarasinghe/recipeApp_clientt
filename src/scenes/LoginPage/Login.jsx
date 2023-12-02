import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/action';

function Login(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandle = async() => {
        try {
            if(email != "" && password != ""){
                document.getElementById('loggin-err').innerHTML = "";
                await fetch(`https://worried-gold-goshawk.cyclic.app/auth/user/${email}/${encodeURIComponent(password)}`, {
                    method : "GET",
                    headers : {"Content-Type" : "Application/json"},
                })
                .then(function(response) {return response.json()})
                .then(data => {
                    document.getElementById('loggin-err').innerHTML = data.status;
                    if(data.status == 'Signed-in Successfully'){
                        // dispatch(setUser(data.user));
                        dispatch(setUser({"user" : data.user, "token" : data.token}));
                        navigate('/');
                    }
                });
            }
            else{
                document.getElementById('loggin-err').innerHTML = "All the fields are required!";
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div id='loginpage-wrapper'>
            <div id='content-card'>
                <div id='row-1'>
                    <p>COOK</p>
                </div>
                <div id='row-2'>
                    <p>Login</p>
                    <input type="text" className="form" name="email" placeholder="E-mail" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    <input type="password" className="form" name="password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    <input type="button" id="button" value="Sign-in" onClick={() => {loginHandle()}}/>
                </div>
                <div id='row-3'>
                    <p id='loggin-err'></p>
                    <p>Dont have an account? <span className='clickable-text' onClick={() => {navigate('/register')}}>Sign up here!</span></p>
                </div>
            </div>
        </div>
    );
}

export default Login;