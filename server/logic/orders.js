const ordersDao = require("../dao/orders");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

async function getOrdersShipDates() {
    return await ordersDao.getOrdersShipDates();
}

async function order(orderDetails, cartId, customerId) {
    validations(orderDetails);
    await ordersDao.order(orderDetails, cartId, customerId);
}

function validations(order) {
    if (order.city == null || order.street == null || order.creditCard == null || order.shippingDate == null
        || order.city == '' || order.street == '') {
        throw new ServerError(ErrorType.ALL_FIELDS_REQUIRED);
    }
    if (order.creditCard > 9999 || order.creditCard < 1000) {
        throw new ServerError(ErrorType.INVALID_CREDITCARD);
    }
}


module.exports = {
    getOrdersShipDates,
    order
};
