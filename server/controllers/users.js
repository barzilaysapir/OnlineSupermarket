const cache = require("../controllers/cache");
const usersLogic = require('../logic/users');
const express = require('express');
const router = express.Router();

// Login
router.post("/login", async (request, response, next) => {
    let userLoginDetails = request.body;

    try {
        let successfullLoginData = await usersLogic.login(userLoginDetails);
        response.json(successfullLoginData);

    } catch (err) {
        return next(err);
    }
});

// Logout
router.post("/logout", async (request, response, next) => {
    let token = request.body;
    
    try {
        cache.remove(token);
        response.json();

    } catch (err) {
        return next(err);
    }
});

// Signup validations
router.post("/validations", async (request, response, next) => {
    let userDetails = request.body;

    try {
        await usersLogic.signupFirstValidations(userDetails);
        response.json();

    } catch (err) {
        return next(err);
    }
});

// Complete signup
router.post("/signup", async (request, response, next) => {
    let newUserDetails = request.body;

    try {
        await usersLogic.addUser(newUserDetails);
        response.json();

    } catch (err) {
        return next(err);
    }
});


// Get user's address
router.get("/address", async (request, response, next) => {
    try {
        let street = cache.extractUserDataFromCache(request).street;
        let city = cache.extractUserDataFromCache(request).city;
        
        let userAddress = { city, street };
        response.json(userAddress);

    } catch (err) {
        return next(err);
    }
});

module.exports = router;
