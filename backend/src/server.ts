import { createApp } from './app';
import { config } from './config';

const app = createApp();

app.listen(config.port, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║  ⚡  FlashScan API                            ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log(`║  🚀 Server running on port ${config.port}                     ║`);
    console.log(`║  📚 Swagger docs: http://localhost:${config.port}/api-docs     ║`);
    console.log(`║  💚 Health check: http://localhost:${config.port}/api/v1/health ║`);
    console.log(`║  🌐 Environment: ${config.env.padEnd(36)}║`);
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log('║  Endpoints:                                         ║');
    console.log(`║  POST /api/v1/scan/network  → Network scan (NMPA)   ║`);
    console.log(`║  POST /api/v1/scan/web      → Web scan (ZAC)        ║`);
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log('');
});
