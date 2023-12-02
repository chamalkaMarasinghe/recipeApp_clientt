import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/action';

function Register(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLasttName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordCOnfirm] = useState('');

    const handleButtonNavigation = (e, currentInput) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            // Move to the next input field
            switch (currentInput) {
            case 'firstname':
                document.getElementsByName('lastname')[0].focus();
                break;
            case 'lastname':
                document.getElementsByName('email')[0].focus();
                break;
            case 'email':
                document.getElementsByName('phone')[0].focus();
                break;
            case 'phone':
                document.getElementsByName('password')[0].focus();
                break;
            case 'password':
                document.getElementsByName('password-confirm')[0].focus();
                break;
            default:
                break;
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
          // Move to the previous input field
            switch (currentInput) {
            case 'lastname':
                document.getElementsByName('firstname')[0].focus();
                break;
            case 'email':
                document.getElementsByName('lastname')[0].focus();
                break;
            case 'phone':
                document.getElementsByName('email')[0].focus();
                break;
            case 'password':
                document.getElementsByName('phone')[0].focus();
                break;
            case 'password-confirm':
                document.getElementsByName('password')[0].focus();
                break;
            default:
                break;
            } 
        } else if (e.key === 'Enter'){
            onSubmit();
        }
    };

    const findDigitCount = (str)  => {
        let digitsArr = str.match(/\d+/g);
        if (digitsArr) {
            return digitsArr.join("").length;
        }
        return 0;
    }

    const findUppercaseCount = (str) => {
        let uppercaseArr = str.match(/[A-Z]/g);
        if (uppercaseArr) {
            return uppercaseArr.length;
        }
        return 0;
    }

    const checkPasswordValidity = () => {
        try {
            let pwField = document.getElementsByName('password')[0];
            let pwStatus = document.getElementById('password-status');
            if(password.length < 6 || findDigitCount(password) < 2 || findUppercaseCount(password) < 1){
                pwField.style.borderColor = 'red';
                pwStatus.innerHTML = "Minimum 6 characters, 2 digits and 1 uppercase";
            }
            else{
                pwField.style.borderColor = 'grey';
                pwStatus.innerHTML = "";
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const onSubmit = async() => {
        try {
            if(firstname != "" && lastname != "" && email != "" && phone != "" && password != "" && passwordConfirm != ""){
                
                document.getElementById('register-err').innerHTML = "";
                if(password.length < 6 || findDigitCount(password) < 2 || findUppercaseCount(password) < 1){
                    
                    document.getElementById('register-err').innerHTML = "Less secure password!";
                } else{
                    
                    document.getElementById('register-err').innerHTML = "";
                    if(password.localeCompare(passwordConfirm) == 0){

                        document.getElementById('register-err').innerHTML = "";
                        await fetch(`https://worried-gold-goshawk.cyclic.app/auth/user/exist/${email}`, {
                            method : "GET",
                            headers : { 'Content-Type' : 'application/json'},
                        })
                        .then(function(response) {return response.json()})
                        .then(async data => {

                            if(data.exist == true){

                                document.getElementById('register-err').innerHTML = "Email was already used!";
                                document.getElementsByName('email')[0].value = "";
                                setEmail('');
                            }else{

                                document.getElementById('register-err').innerHTML = "";
                                await fetch('https://worried-gold-goshawk.cyclic.app/auth/user', {
                                    method : "POST",
                                    headers : { 'Content-Type' : 'application/json'},
                                    body : JSON.stringify({firstname, lastname, email, phone, password})
                                })
                                .then(function(response) {return response.json()})
                                .then(data => {
                                    //dispatch(setUser(data.newUser));
                                    dispatch(setUser({"user" : data.newUser, "token" : data.token}));
                                    //pass the data throug pages with the help of useNAvigate()
                                    // navigate('/', { state: { user: data.newUser } });
                                    navigate('/');

                                })
                            }
                        })
                    }
                    else{
                        document.getElementsByName('password-confirm')[0].value = "";
                        setPasswordCOnfirm('');
                        document.getElementById('register-err').innerHTML = "Password Confirmatin was mismatched!";
                    }
                }
            }else{
                document.getElementById('register-err').innerHTML = "All the fields are required!";
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div id='register-page-wrapper'>
            <div id='content-card'>
                <div id='row-1'>
                    <p>COOK</p>
                </div>
                <div id='row-2'>
                    <p>Register</p>
                    <form>
                        <input type="text" className="form" name="firstname" placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}} onKeyDown={(e) => handleButtonNavigation(e, 'firstname')} required/>
                        <input type="text" className="form" name="lastname" placeholder="Last Name" onChange={(e) => {setLasttName(e.target.value)}} onKeyDown={(e) => handleButtonNavigation(e, 'lastname')} required/>
                        <input type="email" className="form" name="email" placeholder="E-mail" onChange={(e) => {setEmail(e.target.value)}} onKeyDown={(e) => handleButtonNavigation(e, 'email')} required/>
                        <input type="tel" className="form" name="phone" placeholder="Contact Number - X XXX XX XX XX" pattern="[0-9]{10}" onChange={(e) => {setPhone(e.target.value)}} onKeyDown={(e) => handleButtonNavigation(e, 'phone')} required/>
                        <input type="password" className="form" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} onKeyUp={() => {checkPasswordValidity()}} onKeyDown={(e) => handleButtonNavigation(e, 'password')} required/>
                        <p id='password-status'>Minimum 6 characters, 2 digits and 1 uppercase</p>
                        <input type='password' className="form" name="password-confirm" placeholder="Confirm the Password" onChange={(e) => {setPasswordCOnfirm(e.target.value)}} onKeyDown={(e) => handleButtonNavigation(e, 'password-confirm')} required/>
                        <input type="button" id="button" name="register" value="Register" onClick={() => {onSubmit()}}/>
                    </form>
                </div>
                <div id='row-3'>
                    <p id='register-err'></p>
                    <p>Already have an account? <span className='clickable-text' onClick={() => {navigate('/login')}}>Sign in here!</span></p>
                </div>
            </div>
        </div>
    );
}

export default Register;