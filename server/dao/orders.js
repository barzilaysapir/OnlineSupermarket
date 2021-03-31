let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");


async function getOrdersShipDates() {
    let sql = `SELECT 
                    ship_date AS 'shipDate' 
                FROM
                    orders
                GROUP BY ship_date
                HAVING COUNT(*) >= 3`;

    try {
        let busyShipDates = await connection.execute(sql);
        return busyShipDates;
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function order(order, cartId, customerId) {
    let orderSql = `INSERT INTO orders 
               (cart_id, customer_id, final_price, ship_city, ship_address, ship_date, order_date, credit_card) 
               VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

    let formattedOrderDate = order.orderDate.split("T")[0];
    let formattedshippingDate = order.shippingDate.split("T")[0];
    
    let orderParameters = [
        cartId, customerId, order.finalPrice, order.city, order.street,
        formattedshippingDate, formattedOrderDate, order.creditCard
    ];

    try {
        await connection.executeWithParameters(orderSql, orderParameters);
        await closeCart(cartId);

    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, orderSql, err);
    }

}

async function closeCart(cartId) {
    let cartSql = `UPDATE carts SET status = 'close' WHERE (id = ?)`;

    try {
        await connection.executeWithParameters(cartSql, cartId);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, cartSql, err);
    }
}


module.exports = {
    getOrdersShipDates,
    order,
};
