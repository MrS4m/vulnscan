import { execFile } from 'child_process';
import { promisify } from 'util';
import { INetworkScanner } from '../../domain/interfaces/INetworkScanner';
import { ScanResult } from '../../domain/entities/ScanResult';
import { ScanType } from '../../domain/enums/ScanType';
import { PortInfo } from '../../domain/entities/PortInfo';
import { Vulnerability } from '../../domain/entities/Vulnerability';
import { SeverityLevel } from '../../domain/value-objects/SeverityLevel';
import { NmapXmlParser } from './NmapXmlParser';
import { config } from '../../config';

const execFileAsync = promisify(execFile);

export class RealNmapScanner implements INetworkScanner {
    async scan(ip: string, scanMode: 'quick' | 'full'): Promise<ScanResult> {
        const startedAt = new Date();
        const vulnerabilities: Vulnerability[] = [];
        const portsInfo: PortInfo[] = [];

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

            const { stdout } = await execFileAsync(config.nmap.path, args, { timeout });

            // Parsear resultados
            const parsedPorts = NmapXmlParser.parsePorts(stdout);

            for (const p of parsedPorts) {
                portsInfo.push(new PortInfo({
                    port: p.portid,
                    protocol: p.protocol,
                    state: p.state,
                    service: p.service,
                    version: p.version,
                    risk: p.risk
                }));

                // Se for uma porta crítica, adiciona uma vulnerabilidade genérica baseada no risco detectado
                if (p.risk.isHigherThan(SeverityLevel.MEDIUM)) {
                    vulnerabilities.push(new Vulnerability({
                        name: `Service Exposure: ${p.service}`,
                        description: `O serviço ${p.service} na porta ${p.portid} está exposto e pode representar um risco de segurança.`,
                        severity: p.risk,
                        category: 'Network Exposure',
                        mitigation: `Avaliar se o serviço ${p.service} precisa estar exposto. Se sim, garantir que a versão (${p.version}) esteja atualizada e protegida por firewall.`
                    }));
                }
            }

        } catch (error: any) {
            console.error('Erro na execução do Nmap:', error);
            vulnerabilities.push(new Vulnerability({
                name: 'Nmap Execution Error',
                description: `Erro ao executar varredura real: ${error.message}`,
                severity: SeverityLevel.LOW,
                category: 'System',
                mitigation: 'Verificar se o Nmap está instalado corretamente e se o IP é acessível.'
            }));
        }

        const summary = this.generateSummary(ip, portsInfo, vulnerabilities);

        return new ScanResult({
            scanType: ScanType.NETWORK,
            target: ip,
            startedAt,
            ports: portsInfo,
            vulnerabilities,
            summary
        });
    }

    private generateSummary(ip: string, ports: PortInfo[], vulnerabilities: Vulnerability[]): string {
        if (ports.length === 0 && vulnerabilities.length === 0) {
            return `🔎 Varredura Nmap concluída para ${ip}. Nenhuma porta aberta detectada no modo solicitado.`;
        }

        const critical = vulnerabilities.filter(v => v.severity.value === 'CRITICAL').length;
        let summary = `🛡️ Varredura REAL Nmap concluída para ${ip}: ${ports.length} portas abertas. `;

        if (critical > 0) {
            summary += `⚠️ ATENÇÃO: ${critical} serviços críticos expostos identificados.`;
        } else {
            summary += `Análise de serviços concluída com sucesso.`;
        }

        return summary;
    }
}
