"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
function validateRequest(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Os dados enviados são inválidos.',
                details: errors,
            });
            return;
        }
        req.body = result.data;
        next();
    };
}
//# sourceMappingURL=validateRequest.js.map