let categoriesDao = require("../dao/categories");

async function getAllCategories() {
    return await categoriesDao.getAllCategories();
}

async function getProductsByCategory(cartId, categoryId) {
    return await categoriesDao.getProductsByCategory(cartId, categoryId);
}

module.exports = {
    getAllCategories,
    getProductsByCategory
};
