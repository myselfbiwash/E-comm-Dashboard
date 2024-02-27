const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

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

const app = express();

const { verifyToken } = require("./middleware/TokenVerification");
const { upload } = require("./middleware/Multer");
app.use(morgan("dev"));

//const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use("/api/uploads", express.static("uploads"));

app.post("/api/register", handleUserRegistration);

app.post("/api/login", handleLogin);

app.post(
  "/api/add-product",
  verifyToken,
  upload.single("photo"),
  handleAddProduct
);

app.get("/api/products", handleGetProduct);
app.post("/api/carts", handleAddCart);

// app.delete("/product/:id", verifyToken, handleDeleteProduct);

// app.get("/product/:id", verifyToken, handleGetOneProduct);

// app.put("/product/:id", verifyToken, handleUpdateProduct);

app.use("/api/product", productRouter);

app.get("/api/search/:key", verifyToken, handleSearchProduct);

// Route to initiate payment

app.post("/api/payment/initiate", verifyToken, handleInitiatePayment);

// Route to capture payment success
app.post("/api/payment/success", verifyToken, handleSuccessfulPayment);

// Route to capture payment failure
app.post("/api/payment/failure", verifyToken, handleFailurePayment);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
