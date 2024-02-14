import React from 'react';

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [error, setError] = React.useState(false);

    const addProduct = async () => {
        if (!name || !price || !category || !company || !number) {
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const token = JSON.parse(localStorage.getItem('token'));
        let result = await fetch("http://127.0.0.1:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, number, userId }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        result = await result.json();
        console.log(result);
    }

    return (
        <div className='product'>
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

            <button className='appButton' onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;