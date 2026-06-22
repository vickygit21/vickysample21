import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Product from './effect/Product'
import ProductList from './components/ProductList'
import {Route ,Routes} from 'react-router-dom'
import AddProduct from './components/AddProduct'
import UpdateProduct from './components/UpdateProduct'
import ProductCrud from './components/ProductCrud'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/products" element={<ProductList />}/>
      <Route path="/add-product" element={<AddProduct />}/>
      <Route path="/update-product/:id" element={<UpdateProduct />}/>
      <Route path="/register" element= {<Register />} />
      <Route path="/login" element ={<Login />} />
      <Route path="/" element={<Home />}/>
    </Routes>
    </>
  )
}

export default App
