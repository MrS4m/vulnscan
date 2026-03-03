"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
    },
    api: {
        prefix: '/api/v1',
    },
    nmap: {
        path: process.env.NMAP_PATH || 'C:\\Program Files (x86)\\Nmap\\nmap.exe',
    },
};
//# sourceMappingURL=index.js.map