import React, { useEffect } from 'react';
// const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Types;
import { useParams, useNavigate } from 'react-router-dom';



const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [error, setError] = React.useState(false);
    const [photo, setPhoto] = React.useState(null);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.warn(params);
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        console.warn(params);
        let result = await fetch(`api/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        console.warn(name, price, category, company,photo);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('company', company);
        formData.append('number', number);
        formData.append('userId', userId);
        formData.append('photo', photo);
        let result = await fetch(`api/product/${params.id}`, {
            method: 'Put',
            body: formData,
            headers: {
                'Content-Type': "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });

        result = await result.json();
        console.warn(result);
        navigate('/');

    }

    return (
        <form className='product' onSubmit={updateProduct} encType='multipart/form-data'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter Product Name' className='inputBox'
                onChange={(e) => { setName(e.target.value) }} value={name} />


            <input type="text" placeholder='Enter Product Price' className='inputBox'
                onChange={(e) => { setPrice(e.target.value) }} value={price} />

            <input type="text" placeholder='Enter Product Category' className='inputBox'
                onChange={(e) => { setCategory(e.target.value) }} value={category} />


            <input type="text" placeholder='Enter Product Company' className='inputBox'
                onChange={(e) => { setCompany(e.target.value) }} value={company} />

            <input type="number" placeholder='Enter No. of Products' className='inputBox'
                onChange={(e) => { setNumber(e.target.value) }} value={number} />
            
            <input type="file" className='inputBox' onChange={(e) => { setPhoto(e.target.files[0]) }} />


            <button type='submit' className='appButton' >Update Product</button>

        </form>
    )
}

export default UpdateProduct;