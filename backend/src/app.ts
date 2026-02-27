import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import { createRoutes } from './presentation/routes';
import { errorHandler } from './presentation/middleware/errorHandler';
import { swaggerSpec } from './presentation/docs/swagger';

export function createApp(): express.Application {
    const app = express();

    // --- Security Middleware ---
    app.use(helmet());
    app.use(cors({ origin: config.cors.origin }));

    // --- Body Parsing ---
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true }));

    // --- Request Logging ---
    app.use((req, _res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
    });

    // --- Swagger Documentation ---
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: '🛡️ Vulnerability Scanner API Docs',
    }));

    // --- API Routes ---
    app.use(config.api.prefix, createRoutes());

    // --- 404 Handler ---
    app.use((_req, res) => {
        res.status(404).json({
            success: false,
            error: 'Not Found',
            message: 'O endpoint solicitado não foi encontrado. Acesse /api-docs para ver os endpoints disponíveis.',
        });
    });

    // --- Global Error Handler ---
    app.use(errorHandler);

    return app;
}
