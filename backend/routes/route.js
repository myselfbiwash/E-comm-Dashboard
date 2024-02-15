const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const {
    handleDeleteProduct,
    handleGetOneProduct,
    handleUpdateProduct,
} = require("../controllers/controller");

router.route("/:id").get(handleGetOneProduct).put(handleUpdateProduct).delete(handleDeleteProduct);

module.exports = router;