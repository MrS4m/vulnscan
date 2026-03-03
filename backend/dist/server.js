"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config");
const app = (0, app_1.createApp)();
app.listen(config_1.config.port, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║  🛡️  Vulnerability Scanner API                       ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log(`║  🚀 Server running on port ${config_1.config.port}                     ║`);
    console.log(`║  📚 Swagger docs: http://localhost:${config_1.config.port}/api-docs     ║`);
    console.log(`║  💚 Health check: http://localhost:${config_1.config.port}/api/v1/health ║`);
    console.log(`║  🌐 Environment: ${config_1.config.env.padEnd(36)}║`);
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log('║  Endpoints:                                         ║');
    console.log(`║  POST /api/v1/scan/network  → Network scan (NMPA)   ║`);
    console.log(`║  POST /api/v1/scan/web      → Web scan (ZAC)        ║`);
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log('');
});
//# sourceMappingURL=server.js.map