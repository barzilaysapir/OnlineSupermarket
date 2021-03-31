const productsLogic = require("../logic/products");
const express = require("express");
const router = express.Router();
const cache = require("../controllers/cache");


// Edit product
router.put("/", async (request, response, next) => {
    let productDetails = request.body;

    try {
        let updatedProduct = await productsLogic.updateProduct(productDetails);
        response.json(updatedProduct);
    }
    catch (err) {
        return next(err);
    }
});

// Add new product
router.post("/", async (request, response, next) => {
    let newProductDetails = request.body;

    try {
        let newProduct = await productsLogic.addProduct(newProductDetails);
        response.json(newProduct);
    }
    catch (err) {
        return next(err);
    }
});

// Get all products
router.get("/", async (request, response, next) => {
    try {
        let allProducts = await productsLogic.getAllProducts();
        response.json(allProducts);
    }
    catch (err) {
        return next(err);
    }
});

// Get products by search input
router.get("/search/:input", async (request, response, next) => {
    let input = ('%' + request.params.input + '%').toLowerCase();
    let cartId = cache.get("cartId");
    
    try {
        let products = await productsLogic.searchProduct(cartId, input);
        response.json(products);
    }
    catch (err) {
        return next(err);
    }
});


module.exports = router;
