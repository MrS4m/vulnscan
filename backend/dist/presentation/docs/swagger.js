"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '🛡️ Vulnerability Scanner API',
            version: '1.0.0',
            description: `
API REST para análise de vulnerabilidades de redes e websites.

## Funcionalidades

- **Network Scan (NMPA)**: Análise de portas, serviços e vulnerabilidades conhecidas por IP
- **Web Scan (ZAC)**: Análise de headers HTTP, TLS, CORS, CSP e cookies por URL

## Arquitetura

Construída com Clean Architecture + DDD (Domain-Driven Design).

## Disclaimers

⚠️ Esta API tem finalidade exclusivamente **educacional e defensiva**.
O scanner de rede utiliza um engine de conhecimento (não executa nmap real).
O scanner web realiza análise passiva de headers (não tenta exploração ativa).
      `,
            contact: {
                name: 'Security Team',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                ScanResult: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        scanType: { type: 'string', enum: ['NETWORK', 'WEB'] },
                        target: { type: 'string' },
                        startedAt: { type: 'string', format: 'date-time' },
                        completedAt: { type: 'string', format: 'date-time', nullable: true },
                        riskScore: { type: 'number', minimum: 0, maximum: 100 },
                        summary: { type: 'string' },
                        vulnerabilitySummary: {
                            type: 'object',
                            properties: {
                                total: { type: 'number' },
                                critical: { type: 'number' },
                                high: { type: 'number' },
                                medium: { type: 'number' },
                                low: { type: 'number' },
                            },
                        },
                        vulnerabilities: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Vulnerability' },
                        },
                        ports: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/PortInfo' },
                        },
                    },
                },
                Vulnerability: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        severity: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
                        category: { type: 'string' },
                        mitigation: { type: 'string' },
                        cveId: { type: 'string', nullable: true },
                        reference: { type: 'string', nullable: true },
                    },
                },
                PortInfo: {
                    type: 'object',
                    properties: {
                        port: { type: 'number' },
                        state: { type: 'string', enum: ['open', 'closed', 'filtered'] },
                        protocol: { type: 'string', enum: ['tcp', 'udp'] },
                        service: { type: 'string' },
                        version: { type: 'string', nullable: true },
                        risk: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
                        details: { type: 'string', nullable: true },
                    },
                },
            },
        },
    },
    apis: ['./src/presentation/routes/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map