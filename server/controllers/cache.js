const usersCache = new Map();

function set(key, value) {
    usersCache.set(key, value);
};

function get(key) {
    return usersCache.get(key);
};

function remove(key) {
    usersCache.delete(key);
};

function extractUserDataFromCache(request) {
    let authorizationString = request.headers["authorization"];
    let token = authorizationString.substring("Bearer ".length);
    let userData = usersCache.get(token);
    return userData;
}

module.exports = {
    set,
    get,
    remove,
    extractUserDataFromCache
};
