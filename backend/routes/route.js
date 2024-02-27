const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {upload} = require("../middleware/Multer");

const {
    handleDeleteProduct,
    handleGetOneProduct,
    handleUpdateProduct,
} = require("../controllers/controller");

router.route("/:id").get(handleGetOneProduct).put(upload.single('photo'),handleUpdateProduct).delete(handleDeleteProduct);

module.exports = router;