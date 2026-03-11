import { createApp } from './app';
import { config } from './config';

import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

async function startServer() {
    try {
        console.log('Verificando dependências Core...');
        // O bash no docker ou cmd usará o path configurado.
        const command = `"${config.nmap.path}" --version`;
        const { stdout } = await execPromise(command);
        console.log(`✓ Nmap Engine OK: ${stdout.split('\n')[0]}`);
    } catch (error: any) {
        console.warn(`\n⚠️  Aviso: Nmap não encontrado no caminho fornecido: ${config.nmap.path}`);
        console.warn(`     O serviço de varredura ativa não funcionará. Verifique suas varíaveis de ambiente.\n`);
    }

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
}

startServer();
