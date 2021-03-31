let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function login(user) {
    let sql = `SELECT 
                    id, 
                    email, 
                    password, 
                    first_name AS 'firstName', 
                    last_name AS 'lastName', 
                    city, 
                    street, 
                    type 
                FROM 
                    users 
                WHERE 
                    email = ? and password = ?`;

    let parameters = [user.email, user.password];
    let usersLoginResult;

    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);

    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), err);
    }

    await userDoesntExist(usersLoginResult);
    return usersLoginResult[0];
}

async function autoLogin(userId) {
    let sql = `SELECT 
                    id, 
                    email, 
                    password, 
                    first_name AS 'firstName', 
                    last_name AS 'lastName', 
                    city, 
                    street, 
                    type 
                FROM 
                    users 
                WHERE 
                    id = ?`;

    let usersLoginResult;

    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);

    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), err);
    }

    await userDoesntExist(usersLoginResult);
    return usersLoginResult[0];
}

async function userDoesntExist(usersLoginResult) {
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
}

async function isUserAlreadyExist(user) {

    // Exists by email
    let sqlEmailQuery = `SELECT * FROM users WHERE email = ?`;
    let paramEmail = [user.email];

    let email = await connection.executeWithParameters(sqlEmailQuery, paramEmail);
    if (email[0]) {
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST);
    }

    // Exists by id
    let sqlIdQuery = `SELECT * FROM users WHERE id = ?`;
    let paramId = [user.id];

    let id = await connection.executeWithParameters(sqlIdQuery, paramId);
    if (id[0]) {
        throw new ServerError(ErrorType.ID_ALREADY_EXIST);
    }
}

async function addUser(user) {
    let sql = `INSERT INTO 
                    users 
                (id, email, password, first_name, last_name, city, street) 
                    values
                (?, ?, ?, ?, ?, ?, ?)`;

    let parameters = [user.id, user.email, user.password, user.firstName, user.lastName, user.city, user.street];

    try {
        await connection.executeWithParameters(sql, parameters);
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }
}

module.exports = {
    login,
    autoLogin,
    addUser,
    isUserAlreadyExist
};
