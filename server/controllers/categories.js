const categoriesLogic = require("../logic/categories");
const express = require("express");
const router = express.Router();
const cache = require("./cache");

// Get al categories
router.get("/", async (request, response, next) => {
    try {
        let allCategories = await categoriesLogic.getAllCategories();
        response.json(allCategories);
    }
    catch (err) {
        return next(err);
    }
});

// Get category's products
router.get("/:id", async (request, response, next) => {
    let categoryId = request.params.id;

    // A cart ID is required to get the quantity of each product in the customer cart 
    let cartId = cache.get("cartId");

    try {
        let products = await categoriesLogic.getProductsByCategory(cartId, categoryId);
        response.json(products);
    }
    catch (err) {
        return next(err);
    }
});


module.exports = router;
