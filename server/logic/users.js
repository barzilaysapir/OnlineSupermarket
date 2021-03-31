const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const usersDao = require("../dao/users");
const cache = require("../controllers/cache");

const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const RIGHT_SALT = "gtrhusgrh";
const LEFT_SALT = "f56sb4%^Y";


async function login(user) {
    let userLoginData;

    // Auto reconnect
    if (user.id) {
        userLoginData = await usersDao.autoLogin(user.id);

        // Manually
    } else {
        firstStepValidations(user);
        user.password = crypto.createHash("md5").update(LEFT_SALT + user.password + RIGHT_SALT).digest('hex');
        userLoginData = await usersDao.login(user);
    }

    let saltedUserName = LEFT_SALT + userLoginData.username + RIGHT_SALT;
    const token = jwt.sign({ sub: saltedUserName }, config.secret);
    cache.set(token, userLoginData);

    let response = { token, userType: userLoginData.type, userDetails: userLoginData };
    return response;
}

async function signupFirstValidations(user) {
    firstStepValidations(user);

    if (user.id == null || user.id == '') {
        throw new ServerError(ErrorType.ID_FIELD_MISSING);
    }
    if (user.confirmPassword != user.password) {
        throw new ServerError(ErrorType.PASSWORDS_DIDNT_MATCH);
    }

    await usersDao.isUserAlreadyExist(user);
}

async function addUser(user) {
    // Second step validations
    if (user.firstName == null || user.lastName == null || user.city == null || user.street == null
        || user.firstName == '' || user.lastName == '' || user.city == '' || user.street == '') {
        throw new ServerError(ErrorType.ALL_FIELDS_REQUIRED);
    }

    user.password = crypto.createHash("md5").update(LEFT_SALT + user.password + RIGHT_SALT).digest('hex');
    await usersDao.addUser(user);
}

function firstStepValidations(user) {
    if (user.email == null || user.email == '') {
        throw new ServerError(ErrorType.EMAIL_FIELD_MISSING);
    }
    if (user.password == null || user.password == '') {
        throw new ServerError(ErrorType.PASSWORD_FIELD_MISSING);
    }
}

module.exports = {
    login,
    addUser,
    signupFirstValidations
};
