"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealNmapScanner = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const ScanResult_1 = require("../../domain/entities/ScanResult");
const ScanType_1 = require("../../domain/enums/ScanType");
const PortInfo_1 = require("../../domain/entities/PortInfo");
const Vulnerability_1 = require("../../domain/entities/Vulnerability");
const SeverityLevel_1 = require("../../domain/value-objects/SeverityLevel");
const NmapXmlParser_1 = require("./NmapXmlParser");
const config_1 = require("../../config");
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
class RealNmapScanner {
    async scan(ip, scanMode) {
        const startedAt = new Date();
        const vulnerabilities = [];
        const portsInfo = [];
        try {
            // Flags: 
            // -sV (Version detection)
            // -oX - (Output XML to stdout)
            // --open (Only show open ports)
            // -F (Fast mode, top 100 ports) for quick
            const args = ['-sV', '-oX', '-', '--open'];
            if (scanMode === 'quick') {
                args.push('-F');
            }
            args.push(ip);
            // Timeout de 2 minutos para quick, 5 para full
            const timeout = scanMode === 'quick' ? 120000 : 300000;
            const { stdout } = await execFileAsync(config_1.config.nmap.path, args, { timeout });
            // Parsear resultados
            const parsedPorts = NmapXmlParser_1.NmapXmlParser.parsePorts(stdout);
            for (const p of parsedPorts) {
                portsInfo.push(new PortInfo_1.PortInfo({
                    port: p.portid,
                    protocol: p.protocol,
                    state: p.state,
                    service: p.service,
                    version: p.version,
                    risk: p.risk
                }));
                // Se for uma porta crítica, adiciona uma vulnerabilidade genérica baseada no risco detectado
                if (p.risk.isHigherThan(SeverityLevel_1.SeverityLevel.MEDIUM)) {
                    vulnerabilities.push(new Vulnerability_1.Vulnerability({
                        name: `Service Exposure: ${p.service}`,
                        description: `O serviço ${p.service} na porta ${p.portid} está exposto e pode representar um risco de segurança.`,
                        severity: p.risk,
                        category: 'Network Exposure',
                        mitigation: `Avaliar se o serviço ${p.service} precisa estar exposto. Se sim, garantir que a versão (${p.version}) esteja atualizada e protegida por firewall.`
                    }));
                }
            }
        }
        catch (error) {
            console.error('Erro na execução do Nmap:', error);
            vulnerabilities.push(new Vulnerability_1.Vulnerability({
                name: 'Nmap Execution Error',
                description: `Erro ao executar varredura real: ${error.message}`,
                severity: SeverityLevel_1.SeverityLevel.LOW,
                category: 'System',
                mitigation: 'Verificar se o Nmap está instalado corretamente e se o IP é acessível.'
            }));
        }
        const summary = this.generateSummary(ip, portsInfo, vulnerabilities);
        return new ScanResult_1.ScanResult({
            scanType: ScanType_1.ScanType.NETWORK,
            target: ip,
            startedAt,
            ports: portsInfo,
            vulnerabilities,
            summary
        });
    }
    generateSummary(ip, ports, vulnerabilities) {
        if (ports.length === 0 && vulnerabilities.length === 0) {
            return `🔎 Varredura Nmap concluída para ${ip}. Nenhuma porta aberta detectada no modo solicitado.`;
        }
        const critical = vulnerabilities.filter(v => v.severity.value === 'CRITICAL').length;
        let summary = `🛡️ Varredura REAL Nmap concluída para ${ip}: ${ports.length} portas abertas. `;
        if (critical > 0) {
            summary += `⚠️ ATENÇÃO: ${critical} serviços críticos expostos identificados.`;
        }
        else {
            summary += `Análise de serviços concluída com sucesso.`;
        }
        return summary;
    }
}
exports.RealNmapScanner = RealNmapScanner;
//# sourceMappingURL=RealNmapScanner.js.map