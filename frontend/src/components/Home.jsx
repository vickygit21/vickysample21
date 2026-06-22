import React, { useState } from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'
import Register from './Register';
import "./Home.css"

export default function() {
    const[isLogin ,setIsLogin]=useState(true);

  return (
    <div className='container'>
       <div className='tabs'>
         <button onClick={()=>setIsLogin(true)}>
            Login
        </button>
         <button onClick={()=>setIsLogin(false)}>
            Signup
        </button>
        </div>
        {isLogin ? <Login /> :<Register />}

    </div>

  )
}
