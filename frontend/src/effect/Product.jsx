import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';

export default function Product() {
    const [products ,setProducts]=useState([]);
    const [loading ,setLoading]=useState(true);

    async function fetchProducts() {
        try{
            const response = await axios.get('http://localhost:5000/api/products/get');
            console.log(response.data);
        }
        catch(error){
            setLoading(false);
        }
    }
    useEffect (()=>{
        setTimeout(()=>{
            fetchProducts();
        })
    },[])

    if(loading){
        <h1>Loading....Please Wait.</h1>
    }

if(!loading){
  return (
    <div>
        <h1>Product</h1>
        <div className='card'>
            {products.map((product)=>{
                return(
                    <p>
                    <h3>{product.name}</h3>,{product.description}, RS:{product.price} ,<img src={product.image} alt="" />
                </p>
                )
            })}
        </div>
    </div>
  )
}
}