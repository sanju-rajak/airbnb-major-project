class ExpressError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;

        // Capture stack trace (important for debugging)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ExpressError;