let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function getCustomersCart(customerId) {
    let sql = `SELECT 
                    id, 
                    create_date AS 'createDate', 
                    status 
                FROM
                    carts
                WHERE
                    customer_id = ?`;

    try {
        let userCarts = await connection.executeWithParameters(sql, customerId);
        
        let mostRecentUserCart = userCarts[userCarts.length - 1];
        return mostRecentUserCart;

    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function createCart(customerId) {
    let sql = `INSERT INTO carts 
               (customer_id, create_date) 
               VALUES(?, ?)`;

    let currentDate = new Date().toISOString().split('T')[0];
    let parameters = [customerId, currentDate];

    try {
        await connection.executeWithParameters(sql, parameters);
        return getCustomersCart(customerId);

    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function getCartItems(cartId) {
    let sql = `SELECT 
                    ci.product_id AS 'id', 
                    p.name, 
                    ci.amount, 
                    p.image_url AS 'imageUrl', 
                    ci.price 
                FROM
                    cart_items ci
                JOIN
                    products p ON p.id = ci.product_id
                WHERE
                    cart_id = ?`;

    try {
        return await connection.executeWithParameters(sql, cartId);

    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function addToCart(product, cartId) {
    let sql = `INSERT INTO cart_items 
               (cart_id, product_id, amount, price) 
               VALUES(?, ?, ?, ?)`;

    product.price = product.price * product.amount;
    let parameters = [cartId, product.id, product.amount, product.price];

    try {
        await connection.executeWithParameters(sql, parameters);
        return product;

    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function updateCart(product, cartId) {
    let sql = `UPDATE cart_items 
                    SET 
                        amount = ?,
                        price = ?
                    WHERE
                        cart_id = ? AND product_id = ?`;

    product.price = product.price * product.amount;
    let parameters = [product.amount, product.price, cartId, product.id];

    try {
        await connection.executeWithParameters(sql, parameters);
        return product;

    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }

}

async function deleteFromCart(productId, cartId) {
    let sql = `Delete FROM cart_items WHERE cart_id = ? AND product_id = ?`;
    let parameters = [cartId, productId];

    try {
        await connection.executeWithParameters(sql, parameters);
        return getCartItems(cartId);

    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function emptyCart(cartId) {
    let sql = `Delete FROM cart_items WHERE cart_id = ?`;

    try {
        await connection.executeWithParameters(sql, cartId);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}


module.exports = {
    getCustomersCart,
    getCartItems,
    createCart,
    addToCart,
    updateCart,
    deleteFromCart,
    emptyCart,
};
