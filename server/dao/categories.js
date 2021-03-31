let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");


async function getAllCategories() {
    let sql = `SELECT 
                    id, 
                    name 
                FROM
                    categories`;

    try {
        return await connection.execute(sql);
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function getProductsByCategory(cartId, categoryId) {
    let sql = `SELECT 
                    p.id,
                    p.name,
                    p.price,
                    p.image_url AS 'imageUrl',
                    IFNULL(ci.amount, 0) AS 'amount',
                    p.category_id AS 'categoryId', 
                    c.name AS 'categoryName'
                FROM
                    products p
                        JOIN
                    categories c ON c.id = p.category_id
                    
                        LEFT JOIN
                    (SELECT 
                        *
                    FROM
                        cart_items
                    WHERE
                        cart_id = ?) ci ON ci.product_id = p.id
                    WHERE
                        c.id = ?`;

    let parameters = [cartId, categoryId];

    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

module.exports = {
    getAllCategories,
    getProductsByCategory
};
