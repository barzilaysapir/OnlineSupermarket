const cache = require("./cache");
const ordersLogic = require('../logic/orders');
const express = require('express');
const router = express.Router();

// Get all busy ship dates
router.get("/", async (request, response, next) => {
    try {
        let allShipDates = await ordersLogic.getOrdersShipDates();
        response.json(allShipDates);
    }
    catch (err) {
        return next(err);
    }
});

// Make an order
router.post("/", async (request, response, next) => {    
    let orderDetails = request.body;
    let cartId = cache.get("cartId");
    let customerId = cache.extractUserDataFromCache(request).id;

    try {
        await ordersLogic.order(orderDetails, cartId, customerId);
        response.json();

    } catch (err) {
        return next(err);
    }
});

module.exports = router;
