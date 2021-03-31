let ErrorType = {

    UNAUTHORIZED: {
        id: 0, httpCode: 401,
        message: "Invalid email or password.",
        isShowStackTrace: false
    },

    GENERAL_ERROR: {
        id: 1, httpCode: 600,
        message: "General error",
        isShowStackTrace: true
    },

    EMAIL_ALREADY_EXIST: {
        id: 2, httpCode: 601,
        message: "Email already exist.",
        isShowStackTrace: false
    },

    ID_ALREADY_EXIST: {
        id: 3, httpCode: 602,
        message: "ID already exist.",
        isShowStackTrace: false
    },

    ID_FIELD_MISSING: {
        id: 4, httpCode: 603,
        message: "ID is required.",
        isShowStackTrace: false
    },

    EMAIL_FIELD_MISSING: {
        id: 5, httpCode: 604,
        message: "Email is required.",
        isShowStackTrace: false
    },

    PASSWORD_FIELD_MISSING: {
        id: 6, httpCode: 605,
        message: "Password is required.",
        isShowStackTrace: false
    },

    INCORRECT_PASSWORD: {
        id: 7, httpCode: 606,
        message: "Incorrect password.",
        isShowStackTrace: false
    },

    ALL_FIELDS_REQUIRED: {
        id: 8, httpCode: 607,
        message: "All fields are required.",
        isShowStackTrace: false
    },

    PASSWORDS_DIDNT_MATCH: {
        id: 9, httpCode: 608,
        message: "Passwords didn't match, please try again.",
        isShowStackTrace: false
    },

    NAME_TOO_LONG: {
        id: 10, httpCode: 701,
        message: "Product's name is longer than 60 charts.",
        isShowStackTrace: false
    },

    IMAGE_URL_TOO_LONG: {
        id: 11, httpCode: 702,
        message: "Image url is too long.",
        isShowStackTrace: false
    },

    INVALID_CREDITCARD: {
        id: 12, httpCode: 703,
        message: "Invalid credit card, last 4 digits only.",
        isShowStackTrace: false
    },
};

module.exports = ErrorType;
