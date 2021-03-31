const cartsDao = require("../dao/carts");
const cache = require("../controllers/cache");


async function getCustomersCart(customerId) {
    let cart = await cartsDao.getCustomersCart(customerId);

    if (cart) {
        cache.set("cartId", cart.id);
    }

    return cart;
}

async function getCartItems() {
    let cartId = cache.get("cartId");

    if (cartId) {
        return await cartsDao.getCartItems(cartId);
    }
}

async function createCart(customerId, currentDate) {
    await cartsDao.createCart(customerId, currentDate);
    let cart = await cartsDao.getCustomersCart(customerId);

    cache.set("cartId", cart.id);
    return cart;
}

async function addToCart(product, cartId) {
    return await cartsDao.addToCart(product, cartId);
}

async function updateCart(product, cartId) {
    return await cartsDao.updateCart(product, cartId);
}

async function deleteFromCart(productId, cartId) {
    return await cartsDao.deleteFromCart(productId, cartId);
}

async function emptyCart(cartId) {
    await cartsDao.emptyCart(cartId);
}


module.exports = {
    getCustomersCart,
    createCart,
    addToCart,
    updateCart,
    deleteFromCart,
    emptyCart,
    getCartItems,
};
