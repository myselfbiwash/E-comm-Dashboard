import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ProductList from "./ProductList";

const Nav = () => {
    const [clickImage, setClickImage] = useState(false);
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();


    const logout = () => {
        localStorage.clear();
        navigate('/');
    }

    const handleLoginClick = () => {
        setClickImage(false);
    }

    const handleSignupClick = () => {
        setClickImage(false);
    }

    const handleClickImage = () => {
        navigate('/');

        setClickImage(true);
       
    }

    return (
        <div>
            {/* <img 
                src="https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png" 
                alt="logo" 
                className="logo" 
                onClick={() => setClickImage(true)}
            /> */}
            {auth ? (
                <div>
                   <img 
                   src="https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png" 
                   alt="logo" 
                   className="logo" 
                   onClick={() => setClickImage(true)}
               />
                <ul className="nav-ul">
                 
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                </div>
            ) : (
                <div>
                  <img 
                src="https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png" 
                alt="logo" 
                className="logo" 
                onClick={() => handleClickImage()}
                
            /> 

                     <ul className="nav-ul nav-right">
                    <li><Link  onClick={handleLoginClick} to="/login">Login</Link></li>
                   <li><Link  onClick={handleSignupClick} to="/signup">Signup</Link></li>

                </ul>
                {clickImage && <ProductList />}
                </div>
               
            )}
        </div>
    )
}

export default Nav;