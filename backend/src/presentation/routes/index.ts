import { Router, Request, Response } from 'express';
import { createNetworkRoutes } from './networkRoutes';
import { createWebRoutes } from './webRoutes';
import { NetworkScanController } from '../controllers/NetworkScanController';
import { WebScanController } from '../controllers/WebScanController';
import { AnalyzeNetworkUseCase } from '../../application/use-cases/AnalyzeNetworkUseCase';
import { AnalyzeWebsiteUseCase } from '../../application/use-cases/AnalyzeWebsiteUseCase';
import { RealNmapScanner } from '../../infrastructure/scanners/RealNmapScanner';
import { WebVulnerabilityScanner } from '../../infrastructure/scanners/WebVulnerabilityScanner';

/**
 * Composes all routes with proper dependency injection.
 * 
 * Dependency graph:
 *   Scanner (Infrastructure) → UseCase (Application) → Controller (Presentation) → Route
 */
export function createRoutes(): Router {
    const router = Router();

    // --- Dependency Injection (Composition Root) ---

    // Infrastructure
    const networkScanner = new RealNmapScanner();
    const webScanner = new WebVulnerabilityScanner();

    // Application
    const analyzeNetworkUseCase = new AnalyzeNetworkUseCase(networkScanner);
    const analyzeWebsiteUseCase = new AnalyzeWebsiteUseCase(webScanner);

    // Presentation
    const networkController = new NetworkScanController(analyzeNetworkUseCase);
    const webController = new WebScanController(analyzeWebsiteUseCase);

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
    router.get('/health', (_req: Request, res: Response) => {
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            uptime: process.uptime(),
        });
    });

    router.use('/scan/network', createNetworkRoutes(networkController));
    router.use('/scan/web', createWebRoutes(webController));

    return router;
}
