"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebRoutes = createWebRoutes;
const express_1 = require("express");
const validateRequest_1 = require("../middleware/validateRequest");
const WebScanRequestDto_1 = require("../../application/dtos/WebScanRequestDto");
function createWebRoutes(controller) {
    const router = (0, express_1.Router)();
    /**
     * @swagger
     * /api/v1/scan/web:
     *   post:
     *     summary: Analyze website vulnerabilities
     *     description: Performs a ZAC (web) analysis on the target URL, checking security headers, TLS configuration, CORS, cookies, and more.
     *     tags: [Web Scan]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - target
     *             properties:
     *               target:
     *                 type: string
     *                 description: Target URL (must start with http:// or https://)
     *                 example: "https://example.com"
     *               scanType:
     *                 type: string
     *                 enum: [quick, full]
     *                 default: quick
     *                 description: Scan mode — quick (essential checks) or full (comprehensive analysis)
     *     responses:
     *       200:
     *         description: Scan completed successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   $ref: '#/components/schemas/ScanResult'
     *       400:
     *         description: Invalid request data
     */
    router.post('/', (0, validateRequest_1.validateRequest)(WebScanRequestDto_1.WebScanRequestSchema), (req, res, next) => controller.scan(req, res, next));
    return router;
}
//# sourceMappingURL=webRoutes.js.map