const express = require("express");
const cors = require("cors");

require("./models/config");

const productRouter = require("./routes/route");


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
  handleAddCart,

} = require("./controllers/controller");

require("dotenv").config();
const app = express();

const { verifyToken } = require("./middleware/TokenVerification");
const {upload} = require("./middleware/Multer");

//const cors = require('cors');
const Transaction = require("./models/transactionConfig");

const axios = require("axios");

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post("/register", handleUserRegistration);

app.post("/login", handleLogin);

app.post("/add-product", verifyToken,upload.single('photo'), handleAddProduct);

app.get("/products", handleGetProduct);
app.post("/carts", handleAddCart);

// app.delete("/product/:id", verifyToken, handleDeleteProduct);

// app.get("/product/:id", verifyToken, handleGetOneProduct);

// app.put("/product/:id", verifyToken, handleUpdateProduct);

app.use("/product", productRouter);


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
