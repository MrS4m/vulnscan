import { Router } from 'express';
import { NetworkScanController } from '../controllers/NetworkScanController';
import { validateRequest } from '../middleware/validateRequest';
import { NetworkScanRequestSchema } from '../../application/dtos/NetworkScanRequestDto';

export function createNetworkRoutes(controller: NetworkScanController): Router {
    const router = Router();

    /**
     * @swagger
     * /api/v1/scan/network:
     *   post:
     *     summary: Analyze network vulnerabilities
     *     description: Performs a simulated NMPA (network) analysis on the target IP address, identifying open ports, services, and known vulnerabilities.
     *     tags: [Network Scan]
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
     *                 description: Target IP address (IPv4 or IPv6)
     *                 example: "192.168.1.1"
     *               scanType:
     *                 type: string
     *                 enum: [quick, full]
     *                 default: quick
     *                 description: Scan mode — quick (common ports) or full (extended ports)
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
    router.post(
        '/',
        validateRequest(NetworkScanRequestSchema),
        (req, res, next) => controller.scan(req, res, next)
    );

    return router;
}
