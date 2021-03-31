let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function getMarketState() {
    let sql = `SELECT 
                    COUNT(id) AS 'info'
                FROM
                    products 
                UNION SELECT 
                    COUNT(id) 
                FROM
                    orders;`;

    try {
        return await connection.execute(sql);
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

module.exports = {
    getMarketState,
};
