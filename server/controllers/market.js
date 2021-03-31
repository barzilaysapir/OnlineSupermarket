const marketLogic = require("../logic/market");
const express = require("express");
const router = express.Router();

// Get market state
router.get("/", async (request, response, next) => {
    try {
        let marketState = await marketLogic.getMarketState();
        response.json(marketState);
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;
