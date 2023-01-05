import React, { useState } from 'react'
import {  Link,useNavigate} from "react-router-dom";
import './login.css'
import {auth} from './firebase'
function  Login() { const [email,setEmail]=useState('');
const [password,setPassword]=useState('')
const history=useNavigate()
const sign=e=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then((auth)=>{
        history('/')
    })
    .catch(error=>alert(error.message))

}
const register=e=>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((auth)=>{
        console.log(auth);
        if(auth){
            history('/')
        }
    })
    .catch(error=>alert(error.message))

}

  return (
   
    <div className="login">
        <Link to ='/'>
    <img className="login__logo"src='https://i.pinimg.com/originals/95/f8/58/95f8588d6469a16271ea2d2fad419d00.png'/>    
    </Link>
    <div className='login__container'>
        <h1>Sign In</h1>
        <form>  
            <h5>Email</h5>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <h5>Password</h5>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button className='sign' type="submit" onClick={sign}>Sign In</button>
        </form>
        <p>By signing in you agree Book Store conditions of Use/Sale.Please see our Privacy Notice.
        </p>
        <button className='login__registerbtn' onClick={register}>Create Account</button>
    </div>
    </div>
)
  }


export default Login