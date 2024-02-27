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
        let result = await fetch(`/api/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
        setNumber(result.number);
        setPhoto(result.photo);
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('company', company);
    formData.append('number', number);
    formData.append('photo', photo);

    const updateProduct = async (e) => {
        e.preventDefault();
        console.warn(name, price, category, company);
        let result = await fetch("/api/product/" + params.id, {
            method: 'put',
            body: formData,
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        console.warn(result);
        navigate('/');

    }

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    }

    return (
        <form className='product' onSubmit={updateProduct} encType='multipart/form-data'>
        <h1>Update Product</h1>
        <input type="text" placeholder='Enter Product Name' className='inputBox'
            onChange={(e) => { setName(e.target.value) }} value={name} />
        {error && !name && <span className='invalid-input'>Enter valid name</span>}

        <input type="text" placeholder='Enter Product Price' className='inputBox'
            onChange={(e) => { setPrice(e.target.value) }} value={price} />
        {error && !price && <span className='invalid-input'>Enter valid price</span>}

        <input type="text" placeholder='Enter Product Category' className='inputBox'
            onChange={(e) => { setCategory(e.target.value) }} value={category} />
        {error && !category && <span className='invalid-input'>Enter valid category</span>}

        <input type="text" placeholder='Enter Product Company' className='inputBox'
            onChange={(e) => { setCompany(e.target.value) }} value={company} />
        {error && !company && <span className='invalid-input'>Enter valid company</span>}

        <input type="number" placeholder='Enter No. of Products' className='inputBox'
            onChange={(e) => { setNumber(e.target.value) }} value={number} />
        {error && !number && <span className='invalid-input'>Enter valid number</span>}

        { photo && <img src={"http://localhost:5000/api/uploads/" + photo} alt="Product" width="100" /> }
        <input type="file" className='inputBox' onChange={handleFileChange} defaultValue={photo} /> <br />

        <button type='submit' className='appButton'>Update Product</button>
    </form>
    )
}

export default UpdateProduct;