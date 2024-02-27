const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const {upload} = require("../middleware/Multer");
const { verifyToken } = require("../middleware/TokenVerification");

const {
    handleDeleteProduct,
    handleGetOneProduct,
    handleUpdateProduct,
} = require("../controllers/controller");

router.route("/:id").get(handleGetOneProduct).put(verifyToken,upload.single('photo'),handleUpdateProduct).delete(verifyToken,handleDeleteProduct);

module.exports = router;