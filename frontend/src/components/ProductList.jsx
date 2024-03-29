import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("api/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
    console.log("Result is here:", result);
  };

  const addToCart = (product) => {
    const updatedCartItems = [...cartItems, product];
    setCartItems(updatedCartItems);
    calculateTotalAmount(updatedCartItems);
  };

  const removeFromCart = (itemIndex) => {
    const updatedCartItems = [...cartItems];
    // console.log('Items',updatedCartItems);
    updatedCartItems.splice(itemIndex, 1);
    setCartItems(updatedCartItems);
    calculateTotalAmount(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
  };

  const calculateTotalAmount = (cartItems) => {
    let total = 0;
    cartItems.forEach((item) => {
      total += parseFloat(item.price);
    });
    setTotalAmount(total);
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`api/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  const deleteFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCartItems);
    calculateTotalAmount(updatedCartItems);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`api/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      deleteFromCart(id);
      getProducts();
    }
  };
  const handleSubmit = async (prodId) => {
    const cartPid = uuidv4();

    try {
      const currentUserId = JSON.parse(localStorage.getItem("user"))._id;

      // Create the cart on the backend
      const response = await fetch("api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartPid,
          userId: currentUserId,
          productIds: prodId,
          totalAmount: totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create cart");
      }

      // Redirect the user to the eSewa login page
      const state = {
        pid: cartPid,
        tAmt: totalAmount,
        amt: totalAmount,
      };
      navigate("/payment", { state });
    } catch (error) {
      console.log("Error initiating payment:", error);
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        placeholder="Search Product"
        className="search-product-box"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>No. of Products</li>
        <li>Operation</li>
        <li>Product Image</li>
      </ul>

      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>{item.number}</li>
            <li>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <Link to={`/update/${item._id}`}>Update</Link>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
            </li>
            <li>
              {" "}
              <img
                src={`api/uploads/${item.photo}`}
                alt={item.name}
              />
            </li>
          </ul>
        ))
      ) : (
        <h1>No Results Found</h1>
      )}

      <div className="cart-items">
        <h3>Cart Items</h3>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} {item.pid}{" "}
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}
        <button onClick={clearCart}>Clear Cart</button>
      </div>

      <div className="total-amount">
        <h3>Total Amount: ${totalAmount}</h3>
      </div>
      <button onClick={() => handleSubmit(cartItems.map((item) => item.pid))}>
        Pay with eSewa
      </button>
    </div>
  );
};

export default ProductList;
