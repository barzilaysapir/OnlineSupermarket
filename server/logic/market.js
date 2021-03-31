let marketDao = require("../dao/market");

async function getMarketState() {
    return await marketDao.getMarketState();
}

module.exports = {
    getMarketState,
};
