import React, { useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import eye from '../../assets/eye.svg'
import dotenv from 'dotenv'
dotenv.config();


const Login = ({setResponse,}) => {

    const [state,setstate]=useState('signup');
    const [visible,setvisible]=useState(false);
    const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validatePassword = (password) => {
    const minLength = 8;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!specialChar.test(password)) {
      return 'Password must contain at least one special character';
    }
    if (!upperCase.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!lowerCase.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!number.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };
    useEffect(()=>{
        
        const password=document.getElementById('password');
if(visible){
    password.setAttribute('type','text');
}
else{

    password.setAttribute('type','password');
}
},[visible]);
    // let name="";
    // let email="";
    // let password="";

    const handlelogin=async ()=>{
        const formdata={
            
            email:document.getElementById('email').value,
            password:document.getElementById('password').value,
        }
       
        
        await fetch(`${process.env.REACT_APP_BASE_URL}v1/apis/login`,{
                  credentials:'include',
                    method:'POST',
                    
                    headers:{
                        'Content-Type':'application/json',
                        Accept:"application/json"
                    },
                    body:JSON.stringify(formdata)
        }).then((res)=>{console.log(res);return res.json();}).then((res)=>{
            console.log("login response",res);
            if(res.success){
                alert("You are Successfully Logged In");
                localStorage.setItem('State','login');
                console.log(res.iscreator);
                setResponse(res.iscreator,localStorage.getItem('State'));
                localStorage.setItem('creator',Boolean(res.iscreator));
                 window.location.reload();
            }
            else{
                alert(res.error);
            }
            
        })

        
       
    }
    const handleChange = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
    
        const error = validatePassword(inputPassword);
        setErrorMessage(error);
        setIsValid(!error);
      };
      const handlePassword=(e)=>{
        if(e.target.value.length==0){
        alert( `Password Should include:
        * Password must be at least 8 characters long.
        * Password must contain at least one special character.
        * Password must contain at least one uppercase letter.
        * Password must contain at least one lowercase letter.
        * Password must contain at least one number.`    
        )
    }
      }

    const handlesignup=async()=>{
        if(isValid){
        const formdata={
            name:document.getElementById('name').value,
            email:document.getElementById('email').value,
            password:document.getElementById('password').value,
        }
        if(isValid){
        await fetch(`${process.env.REACT_APP_BASE_URL}v1/apis/signup`,{
            method:'POST',
            headers:{
       'Content-Type':'application/json',
         Accept:"application/json"
            },
            body:JSON.stringify(formdata),
            credentials:'include'

        }).then((res)=>res.json()).then(res=>{
            if(res.success){
                localStorage.setItem('State','login');
                setResponse(res.iscreator,localStorage.getItem('State'));
                localStorage.setItem('creator',Boolean(res.iscreator));
                alert("Sign Up Sucessfull!")
                window.location.reload();
            }
            else{
                alert(res.error);
            }
        })
    }
}
else {
    alert( `Password Should include:
        * Password must be at least 8 characters long.
        * Password must contain at least one special character.
        * Password must contain at least one uppercase letter.
        * Password must contain at least one lowercase letter.
        * Password must contain at least one number.`    
        )
}
    }

  return (
    <div className='login-container'>
        <div className='top-logo'>
            <img src={logo} alt="" />
        </div>
        <div className="main-part">
            <div className="main-part-left">
                {state=='signup'?<h1>Sign Up</h1>:<h1>Log In</h1>}
                <div>
                    {state=='signup'?<p className='heading'>Create an Account</p>:<p className='heading'>Welcome Back!</p>}
                    <br />
                    {state=='signup'?<p className='login'>Already have an account?<span style={{cursor:'pointer'}}  onClick={()=>setstate('login')}><strong>Log In</strong></span></p>:<p className='login'>Don't have an account?<span style={{cursor:'pointer'}} onClick={()=>setstate('signup')}><strong>Sign Up</strong></span></p>}
                </div>
                {state=='signup'?
                <form >
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email"   />
                </div>
                <div className='password'>
                    <label htmlFor="password">Password</label>
                    <div>
                    <input type="password" name="password" id="password" onClick={(e)=>handlePassword(e)} onChange={handleChange}    />
                    
                    <img onClick={()=>{setvisible(!visible);}} src={eye} alt="" />
                    </div>
                    <div style={{ color: isValid ? 'green' : 'red' }}>
        {isValid ? 'Password is valid' : errorMessage}
      </div>
                    
                </div>
               <button type="button" onClick={handlesignup}>Sign Up</button>
            </form>
            :
            <form onSubmit={(e)=>{handlelogin();e.preventDefault();} } >

            <div>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email"   />
            </div>
            <div className='password'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"  />
                <img onClick={()=>{setvisible((!visible));} } src={eye} alt="show" />
            </div>
            <button type="submit" >Log In</button>
        </form>
                }

            </div>
            <div className="main-part-right">
                <img src={logo} alt="" />
            </div>
        </div>
      
    </div>
  )
}

export default Login
