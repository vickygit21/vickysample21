import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const[email , setEmail]=useState("");
    const[password ,setPassword]=useState("");
    const navigate =useNavigate();

    const handleLogin =async(e) => {
        e.preventDefault();
        console.log("success")
        try{
            const res=await axios.post(`http://localhost:5000/api/auth/login` ,{email ,password,});
            localStorage.setItem("token" ,res.data.token);

            navigate("/products");

        }
        catch{
            console.log("Login Failed...");
        }
    }
  return (
    <div>
        <form className='form' onSubmit={handleLogin}>
            <input 
            type='email'
            placeholder='Email'
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />
            
            <input
            type='password'
            placeholder='Password'
            onChange={(e)=>{setPassword(e.target.value)}}
            />
            
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}
