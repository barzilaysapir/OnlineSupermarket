let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function getAllProducts() {
    let sql = `SELECT 
                    p.id,
                    p.name, 
                    p.price, 
                    p.image_url AS 'imageUrl',  
                    p.category_id AS 'categoryId', 
                    c.name AS 'categoryName'
                FROM
                    products p
                        JOIN
                    categories c ON c.id = p.category_id`;

    try {
        let allProducts = await connection.execute(sql);
        return allProducts;
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function updateProduct(product) {
    let sql = `UPDATE 
                    products 
                SET 
                    name = ? ,
                    price = ? ,
                    image_url = ? ,
                    category_id = ? 
                WHERE 
                    (id = ?)`;

    product.name = product.name.toLowerCase();
    let parameters = [product.name, product.price, product.imageUrl, product.categoryId, product.id];

    try {
        return await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function addProduct(product) {
    let sql = `INSERT INTO 
                    products
                (name, price, image_url, category_id)
                    values 
                (?, ?, ?, ?)`;

    product.name = product.name.toLowerCase();
    let parameters = [product.name, product.price, product.imageUrl, product.categoryId];

    try {
        let response = await connection.executeWithParameters(sql, parameters);
        let newProductId = response.insertId;
        return await getNewProduct(newProductId);
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function getNewProduct(productId) {
    let sql = `SELECT 
                    p.id,
                    p.name, 
                    p.price, 
                    p.image_url AS 'imageUrl',  
                    p.category_id AS 'categoryId', 
                    c.name AS 'categoryName'
                FROM
                    products p
                        JOIN
                    categories c ON c.id = p.category_id
                WHERE
                    p.id = ?`;

    try {
        let newProduct = await connection.executeWithParameters(sql, productId);
        return newProduct[0];
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

async function searchProduct(cartId, input) {
    let sql = `SELECT 
                    p.id,
                    p.name,
                    p.price,
                    p.image_url AS 'imageUrl',
                    IFNULL(ci.amount, 0) AS 'amount'
                FROM
                    products p
                        LEFT JOIN
                    (SELECT 
                        *
                    FROM
                        cart_items
                    WHERE
                        cart_id = ?) ci ON ci.product_id = p.id 
                WHERE
                    p.name LIKE ?`;

    let parameters = [cartId, input];

    try {
        return await connection.executeWithParameters(sql, parameters);
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

module.exports = {
    getAllProducts,
    updateProduct,
    addProduct,
    searchProduct,
};
