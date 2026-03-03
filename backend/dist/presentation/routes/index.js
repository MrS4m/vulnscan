"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = createRoutes;
const express_1 = require("express");
const networkRoutes_1 = require("./networkRoutes");
const webRoutes_1 = require("./webRoutes");
const NetworkScanController_1 = require("../controllers/NetworkScanController");
const WebScanController_1 = require("../controllers/WebScanController");
const AnalyzeNetworkUseCase_1 = require("../../application/use-cases/AnalyzeNetworkUseCase");
const AnalyzeWebsiteUseCase_1 = require("../../application/use-cases/AnalyzeWebsiteUseCase");
const RealNmapScanner_1 = require("../../infrastructure/scanners/RealNmapScanner");
const WebVulnerabilityScanner_1 = require("../../infrastructure/scanners/WebVulnerabilityScanner");
/**
 * Composes all routes with proper dependency injection.
 *
 * Dependency graph:
 *   Scanner (Infrastructure) → UseCase (Application) → Controller (Presentation) → Route
 */
function createRoutes() {
    const router = (0, express_1.Router)();
    // --- Dependency Injection (Composition Root) ---
    // Infrastructure
    const networkScanner = new RealNmapScanner_1.RealNmapScanner();
    const webScanner = new WebVulnerabilityScanner_1.WebVulnerabilityScanner();
    // Application
    const analyzeNetworkUseCase = new AnalyzeNetworkUseCase_1.AnalyzeNetworkUseCase(networkScanner);
    const analyzeWebsiteUseCase = new AnalyzeWebsiteUseCase_1.AnalyzeWebsiteUseCase(webScanner);
    // Presentation
    const networkController = new NetworkScanController_1.NetworkScanController(analyzeNetworkUseCase);
    const webController = new WebScanController_1.WebScanController(analyzeWebsiteUseCase);
    // --- Routes ---
    /**
     * @swagger
     * /api/v1/health:
     *   get:
     *     summary: Health check
     *     description: Returns the API health status
     *     tags: [Health]
     *     responses:
     *       200:
     *         description: API is healthy
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: ok
     *                 timestamp:
     *                   type: string
     *                   example: "2024-01-01T00:00:00.000Z"
     *                 version:
     *                   type: string
     *                   example: "1.0.0"
     */
    router.get('/health', (_req, res) => {
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            uptime: process.uptime(),
        });
    });
    router.use('/scan/network', (0, networkRoutes_1.createNetworkRoutes)(networkController));
    router.use('/scan/web', (0, webRoutes_1.createWebRoutes)(webController));
    return router;
}
//# sourceMappingURL=index.js.map