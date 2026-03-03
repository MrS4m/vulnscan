"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("./config");
const routes_1 = require("./presentation/routes");
const errorHandler_1 = require("./presentation/middleware/errorHandler");
const swagger_1 = require("./presentation/docs/swagger");
function createApp() {
    const app = (0, express_1.default)();
    // --- Security Middleware ---
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({ origin: config_1.config.cors.origin }));
    // --- Body Parsing ---
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ extended: true }));
    // --- Request Logging ---
    app.use((req, _res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    });
    // --- Swagger Documentation ---
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: '🛡️ Vulnerability Scanner API Docs',
    }));
    // --- API Routes ---
    app.use(config_1.config.api.prefix, (0, routes_1.createRoutes)());
    // --- 404 Handler ---
    app.use((_req, res) => {
        res.status(404).json({
            success: false,
            error: 'Not Found',
            message: 'O endpoint solicitado não foi encontrado. Acesse /api-docs para ver os endpoints disponíveis.',
        });
    });
    // --- Global Error Handler ---
    app.use(errorHandler_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map