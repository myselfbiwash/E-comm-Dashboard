import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [photo, setPhoto] = React.useState(null);
    const [error, setError] = React.useState(false);

    const addProduct = async (event) => {
        event.preventDefault();
        if (!name || !price || !category || !company || !number || !photo) {
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const token = JSON.parse(localStorage.getItem('token'));

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('company', company);
        formData.append('number', number);
        formData.append('userId', userId);
        formData.append('photo', photo);

        let result = await fetch("api/add-product", {
            method: 'post',
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        result = await result.json();
        console.log(result);
    }

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    }

    return (
        <form className='product' onSubmit={addProduct} encType='multipart/form-data'>
            <h1>Add Product</h1>
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

            <input type="file" className='inputBox' onChange={handleFileChange} /> <br />

            <button type='submit' className='appButton'>Add Product</button>
        </form>
    )
}

export default AddProduct;