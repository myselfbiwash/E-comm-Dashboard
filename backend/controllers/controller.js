const fs = require('fs');
const path = require('path');
const User = require("../models/User");
const Product = require("../models/Product");
const Transaction = require('../models/transactionConfig');
const Cart = require('../models/Cart');
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');


const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;

async function handleUserRegistration(req, res) {
    let user = new User(req.body);
  console.log(user);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: '6h' }, (err, token) => {
    if (err) {
      return res.send({ result: "Something went wrong.. Please try again later from registration!" })
    }
     res.send({ result, auth: token });
  })
  }

  async function handleLogin(req, res) {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
          Jwt.sign({ user }, jwtKey, { expiresIn: '6h' }, (err, token) => {
            if (err) {
              console.log("Error from login jwt sign: ", err);
              return res.send({ result: "Something went wrong.. Please try again later from login!" })
            }
            res.send({ user, auth: token });
          })
        }
        else {
          res.send({ result: 'No User Found' })
        }
      }
      else {
        res.send({ result: 'No User Found' })
      }
  }

  
  async function handleAddProduct(req, res) {
    try {
      let product = new Product({
        ...req.body,
        pid: uuidv4(), // Generate a unique pid
        photo: req.file.filename,
      });
      let result = await product.save();
      console.log(req.body);
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while adding the product.');
    }
  }

  async function handleGetProduct(req, res) {
    let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  }
  else {
    res.send({ result: "No Products found" });
  }
  }

  async function handleDeleteProduct(req, res) {
    const result = await Product.deleteOne({ _id: req.params.id })
  res.send(result);
  }

  async function handleGetOneProduct(req, res) {
    const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  }
  else {
    res.send({ result: "No Record Found. " });
  }
  }

  async function handleUpdateProduct(req, res) {
    let result = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: req.body
      }
    )
    res.send(result);
  }

  async function handleSearchProduct(req, res) {
    let result = await Product.find({
      "$or": [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } }
  
      ]  //name in collection is matched to key parameter passed in url
    });
    res.send(result);
  }

  
async function handleAddCart(req, res) {
  console.log("🚀 ~ handleAddCart ~ req.body:", req.body)
  const userId = req.user._id;
  const { cartPid, productIds, totalAmount } = req.body;

  let cart = new Cart({
    cartPid,
    userId,
    productIds,
    totalAmount,
  });

  let result = await cart.save();
  res.send(result);
}


  async function handleInitiatePayment(req, res) {
    try {
      const { amount } = req.body;
  
      // Make a request to eSewa to initiate the payment
      const response = await axios.post("https://uat.esewa.com.np/epay/main", {
        amt: amount,
        tAmt: amount,
        pid: "TEST_PRODUCT",
        scd: "EPAYTEST",
        su: "http://localhost:5000/payment/success",
        fu: "http://localhost:5000/payment/failure",
      });
  
      // Extract the redirect URL from the response and send it to the client
      const redirectUrl = response.request.res.responseUrl;
      res.json({ redirectUrl });
    } catch (error) {
      console.log("Error initiating payment:", error);
      res.status(500).json({ error: "Payment initiation failed" });
    }
  }


  async function handleSuccessfulPayment(req, res) {
    try {
      const { transactionId, amount } = req.body;
  
      // Save the successful transaction to the database
      const transaction = new Transaction({
        transactionId,
        amount,
        status: "success",
      });
  
      await transaction.save();
  
      res.status(200).json({ message: "Payment success recorded" });
    } catch (error) {
      console.log("Error recording payment success:", error);
      res.status(500).json({ error: "Failed to record payment success" });
    }
  }  

  

  async function handleFailurePayment(req, res) {
    try {
      const { transactionId, amount } = req.body;
  
      // Save the failed transaction to the database
      const transaction = new Transaction({
        transactionId,
        amount,
        status: "failure",
      });
  
      await transaction.save();
  
      res.status(200).json({ message: "Payment failure recorded" });
    } catch (error) {
      console.log("Error recording payment failure:", error);
      res.status(500).json({ error: "Failed to record payment failure" });
    }
  }

  module.exports = {
    handleUserRegistration,
    handleLogin,
    handleAddProduct,
    handleGetProduct,
    handleDeleteProduct,
    handleGetOneProduct,
    handleUpdateProduct,
    handleSearchProduct,
    handleInitiatePayment,
    handleSuccessfulPayment,
    handleFailurePayment,
    handleAddCart
  }