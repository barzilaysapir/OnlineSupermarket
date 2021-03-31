const expressJwt = require("express-jwt");
const config = require("../config.json");

let { secret } = config;

function authenticateJwtRequestToken() {
    return expressJwt({ secret, algorithms: ["HS256"] }).unless({
        path: [
            // Get market's status for guests
            '/market',
            '/home',

            // Register
            '/users/validations',
            '/users/signup',

            // Login
            '/users/login',
        ]
    });
}

module.exports = authenticateJwtRequestToken;