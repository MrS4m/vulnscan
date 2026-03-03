"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`[ERROR] ${new Date().toISOString()} - ${statusCode}: ${message}`);
    if (statusCode === 500) {
        console.error(err.stack);
    }
    res.status(statusCode).json({
        success: false,
        error: statusCode === 500 ? 'Internal Server Error' : 'Request Error',
        message: statusCode === 500
            ? 'Ocorreu um erro interno. Tente novamente mais tarde.'
            : message,
    });
}
//# sourceMappingURL=errorHandler.js.map