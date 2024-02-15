const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const {
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

} = require("./controllers/controller");

const Jwt = require("jsonwebtoken");
const jwtKey = "biwash10";
const app = express();

const { verifyToken } = require("./middleware/TokenVerification");

//const cors = require('cors');
const Transaction = require("./db/transactionConfig");

const axios = require("axios");

app.use(express.json());
app.use(cors());

app.post("/register", handleUserRegistration);

app.post("/login", handleLogin);

app.post("/add-product", verifyToken, handleAddProduct);
// app.get("/add-product", async (req, resp)=>{
//   let result = await Product.find();
//   console.warn(result);
//   resp.send(result);
// })

app.get("/products", verifyToken, handleGetProduct);

app.delete("/product/:id", verifyToken, handleDeleteProduct);

app.get("/product/:id", verifyToken, handleGetOneProduct);

app.put("/product/:id", verifyToken, handleUpdateProduct);

app.get("/search/:key", verifyToken, handleSearchProduct);

// Route to initiate payment

app.post("/payment/initiate", verifyToken, handleInitiatePayment);


// Route to capture payment success
app.post("/payment/success", verifyToken, handleSuccessfulPayment);

// Route to capture payment failure
app.post("/payment/failure", verifyToken, handleFailurePayment);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
