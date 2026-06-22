import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';

export default function ProductList() {

    const[products , setProducts]=useState([]);
    const[showModal ,setShowModal]=useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate =useNavigate();
    // const{id}=useParams();

    async function fetchProducts() {
        try{
            const token=localStorage.getItem("token");
            const response= await axios.get("http://localhost:5000/api/products/get" ,
                {
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            setProducts(response.data);
            console.log(response)
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        const token= localStorage.getItem("token");
        if(!token){
            navigate("/");
            return;
        }
        fetchProducts();
    },[])

     async function deleteProduct(id) {
        try{
            await axios.delete(`http://localhost:5000/api/products/${id}`);

            alert("Are u confirm to delete");
            fetchProducts();
        }
        catch(error){
            console.log(error);
        }
     }


  return (
    <div className='container'>
        <h1>Product Lists</h1>
        <button className="add-btn" onClick={()=>setShowModal(true)}>Add Product</button>
        {showModal &&(
            <AddProduct onAdd ={fetchProducts} closeModal={()=> setShowModal(false)} />
        )}
        <div>
            {products.map((product)=>{
            return(
               <div className='card' key={product._id}>
                <img src={`http://localhost:5000/uploads/${product.image}`}/>
                <h2>{product.name}</h2>
                <p>Rs.{product.price}</p>
                <p>{product.description}</p>

                
              <div className='button-group'>
                <button className="update-btn" onClick={()=>{ setSelectedProductId(product._id);setShowUpdateModal(true);}}>Edit </button>
                <button className='delete-btn' onClick={()=> deleteProduct(product._id)}>Delete</button>
              </div>
                    {showUpdateModal &&(
                        <UpdateProduct productId={selectedProductId} onUpdate={fetchProducts} closeModal={() => setShowUpdateModal(false)} />
                    )}

               </div>
            )
        })}
        </div>
        
    </div>
  )
}
