import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ProductPopup.css';


export default function AddProduct({closeModal ,onAdd}) {

    const navigate =useNavigate();

    const [formData ,setFormData]=useState({
        name:"",
        price:"",
        description:""
    });

    const [image ,setImage]=useState(null);

    function handleChange(e){
        setFormData({
        ...formData,[e.target.name]: e.target.value
        });
    }

    function handleImageChange(e){
        setImage(e.target.files[0]);
    }

    async function addProduct(e) {
        e.preventDefault();

        try{
            const data=new FormData();
            data.append("name",formData.name);
            data.append("price" ,formData.price);
            data.append("description" ,formData.description);
            data.append("image",image);

            await axios.post("http://localhost:5000/api/products/create", data);

            onAdd();
            closeModal();
        }
        catch(error){
            console.log(error);
        }
    }


  return (
    <div className='popup-overlay'>
        <div className='popup-box'>
            <h3>Add Product</h3>
        <form onSubmit={addProduct}>
            <input 
            type="text"
            name='name'
            placeholder='Product Name'
            onChange={handleChange}
            />
            <br></br>
            <input 
            type="number"
            name='price'
            placeholder='Price'
            onChange={handleChange}
            />
            <br></br>
            <input 
            type="text"
            name='description'
            placeholder='Description'
            onChange={handleChange}
            />
            <br></br>
            <input 
            type="file"
            onChange={handleImageChange}
            />
            <br></br>
            <div className='button-group'>
                <button type='submit'>Add</button>
                <button type="button" className="close" onClick={closeModal}>Close</button>
            </div>
        </form>

        </div>
    </div>
  )
}
