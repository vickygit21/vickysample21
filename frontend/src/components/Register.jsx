import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Register() {

    const[form , setForm]=useState({
        name:"",
        email:"",
        password:""

    });

    const navigate=useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault();
        try{
            await axios.post(`http://localhost:5000/api/auth/signup` , form);
            navigate("/")
        }
        catch{
            console.log("Registration failed...")
        }        
    }

  return (
    <div>
        <form className='form' onSubmit={handleSubmit}>
            <input
            placeholder='Name'
            onChange={(e)=>{
                setForm({...form , name: e.target.value})
            }}
             />
    
             <input
            placeholder='Email'
            onChange={(e)=>{
                setForm({...form , email: e.target.value})
            }}
             /> 
      
             <input
            placeholder='password'
            onChange={(e)=>{
                setForm({...form , password: e.target.value})
            }}
             />
             
             <button type='submit'>Signup</button>
                       
        </form>
    </div>
  )
}
