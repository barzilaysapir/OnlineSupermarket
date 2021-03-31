class ServerError extends Error {

    constructor(errorType, message, innerError) {
        super(message); // log print

        this.errorType = errorType;
        this.innerError = innerError;
    }

    [Symbol.iterator]() {
        let current = this;
        let done = false;
        const iterator = {
            next() {
                const val = current;
                if (done) {
                    return { value: val, done: true };
                }
                current = current.cause;
                if (!val.cause) {
                    done = true;
                }
                return { value: val, done: false };
            }
        };
        return iterator;
    }
    get why() {
        let _why = '';
        for (const e of this) {
            _why += `${_why.length ? ' <- ' : ''}${e.name}: ${e.message}`;
        }
        return _why;
    }
}

module.exports = ServerError;
