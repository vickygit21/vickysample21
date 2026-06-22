import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateProduct({closeModal ,productId ,onUpdate}) {
    const navigate =useNavigate();
    // const{id}=useParams();

    const[formData ,setFormData]=useState({
        name:"",
        price:"",
        description:""
    });

    const[image ,setImage]=useState(null);


    async function fetchProduct() {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/products/get/${productId}`
      );
      const product =response.data;
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description
      });

    } catch (error) {

      console.log(error);

    }

  }

  // LOAD DATA
  useEffect(() => {
    if(productId){
      fetchProduct();
    }

  }, [productId]);

    function handleChange(e){
        setFormData({
            ...formData, [e.target.name]:e.target.value });
    }

    function handleImageChange(e){
        setImage(e.target.files[0]);
    }

    async function updateProduct(e) {
        e.preventDefault();
         console.log("Product ID:", productId);
          console.log("Form Data:", formData);
        try{
            const data =new FormData();
            data.append("name",formData.name);
            data.append("price",formData.price);
            data.append("description",formData.description);

            if(image){
                data.append("image" ,image);
            }
            await axios.put(
            `http://localhost:5000/api/products/${productId}`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
                }
              ); 
            console.log("Updated Successfully");

            onUpdate();
            closeModal();
        }
        catch(error){
            console.log(error);
        }
    }
    

  return (
    <div className='popup-overlay'>
      <div className='popup-box'>
        <h3>Update Product</h3>
        <form onSubmit={updateProduct}>
            <input
            type='text'
            name="name"
            placeholder='ProductName'
            value={formData.name}
            onChange={handleChange}
            />
            <input
            type='number'
            name="price"
            placeholder='Price'
            value={formData.price}
            onChange={handleChange}
            />
            <input
            type='text'
            name="description"
            placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            />
            <input
            type='file'
            onChange={handleImageChange}
            />
             <div className='button-group'>
                <button type='submit'>Update</button>
                <button type="button" className="close" onClick={closeModal}>Close</button>
            </div>
        </form>
        </div>
    </div>
  )
}
