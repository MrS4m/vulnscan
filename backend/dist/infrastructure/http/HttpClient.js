"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
class HttpClient {
    async get(url, timeoutMs = 10000) {
        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(url);
            const client = parsedUrl.protocol === 'https:' ? https_1.default : http_1.default;
            const req = client.get(url, {
                timeout: timeoutMs,
                headers: {
                    'User-Agent': 'VulnScanner-API/1.0 (Security Research)',
                },
                rejectUnauthorized: false, // Allow self-signed certs for analysis
            }, (res) => {
                let body = '';
                res.on('data', (chunk) => (body += chunk));
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode || 0,
                        headers: res.headers,
                        body,
                    });
                });
            });
            req.on('timeout', () => {
                req.destroy();
                reject(new Error(`Request to ${url} timed out after ${timeoutMs}ms`));
            });
            req.on('error', (err) => {
                reject(new Error(`HTTP request failed for ${url}: ${err.message}`));
            });
        });
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=HttpClient.js.map