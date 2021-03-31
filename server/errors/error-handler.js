let errorHandler = (err, request, response, next) => {

    // jwt authentication error
    if (err.name === 'UnauthorizedError') {
        return response.status(401).json({ message: 'Invalid Token' });
    }

    if (err.errorType != undefined && err.errorType.message != undefined) {
        if (err.errorType.isShowStackTrace) {
            console.error(err);
        }

        response.status(err.errorType.httpCode).json({ error: err.errorType.message });
        return;
    };

    console.error(err);
    response.status(700).json({ error: { error: "General error"} });
};

module.exports = errorHandler;
