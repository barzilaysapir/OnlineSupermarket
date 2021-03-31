const cache = require("./cache");
const cartsLogic = require('../logic/carts');
const express = require('express');
const router = express.Router();

// Get customer's cart
router.get("/", async (request, response, next) => {
    try {
        let customerId = cache.extractUserDataFromCache(request).id;
        
        let customerCart = await cartsLogic.getCustomersCart(customerId);
        response.json(customerCart);
    }
    catch (err) {
        return next(err);
    }
});

// Create new cart
router.post("/", async (request, response, next) => {
    let currentDate = request.body.currentDate;

    try {
        let customerId = cache.extractUserDataFromCache(request).id;
        let customerCart = await cartsLogic.createCart(customerId, currentDate);

        response.json(customerCart);
    }
    catch (err) {
        return next(err);
    }
});

// Get cart's items
router.get("/items", async (request, response, next) => {
    try {
        let cartItems = await cartsLogic.getCartItems();
        response.json(cartItems);
    }
    catch (err) {
        return next(err);
    }
});

// Add to cart
router.post("/items", async (request, response, next) => {
    let product = request.body;
    let cartId = cache.get("cartId");

    try {
        let newCartItem = await cartsLogic.addToCart(product, cartId);
        response.json(newCartItem);
    }
    catch (err) {
        return next(err);
    }
});

// Update on cart
router.put("/items", async (request, response, next) => {
    let product = request.body;
    let cartId = cache.get("cartId");

    try {
        let updatedCartItem = await cartsLogic.updateCart(product, cartId);
        response.json(updatedCartItem);
    }
    catch (err) {
        return next(err);
    }
});

// Remove form cart
router.delete("/items/:id", async (request, response, next) => {
    let productId = request.params.id;
    let cartId = cache.get("cartId");

    try {
        await cartsLogic.deleteFromCart(productId, cartId);
        response.json();
    }
    catch (err) {
        return next(err);
    }
});

// Empty cart
router.delete("/items", async (request, response, next) => {
    let cartId = cache.get("cartId");

    try {
        await cartsLogic.emptyCart(cartId);
        response.json();
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;
