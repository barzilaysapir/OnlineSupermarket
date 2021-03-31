let productsDao = require("../dao/products");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function getAllProducts() {
    return await productsDao.getAllProducts();
}

async function updateProduct(productDetails) {
    await productValidations(productDetails);
    return await productsDao.updateProduct(productDetails);
}

async function addProduct(newProductDetails) {
    await productValidations(newProductDetails);
    return await productsDao.addProduct(newProductDetails);
}

async function getMarketState() {
    return await productsDao.getMarketState();
}

async function searchProduct(cartId, input) {
    return await productsDao.searchProduct(cartId, input);
}

async function productValidations(product) {
    if (product.name == null || product.name == '' ||
        product.imageUrl == null || product.imageUrl == '' ||
        product.price == null || product.categoryId == null
    ) {
        throw new ServerError(ErrorType.ALL_FIELDS_REQUIRED);
    }

    if (product.name.length > 60) {
        throw new ServerError(ErrorType.NAME_TOO_LONG);
    }
    
    if (product.imageUrl.length > 250) {
        throw new ServerError(ErrorType.IMAGE_URL_TOO_LONG);
    }
}

module.exports = {
    getAllProducts,
    updateProduct,
    addProduct,
    getMarketState,
    searchProduct,
};
