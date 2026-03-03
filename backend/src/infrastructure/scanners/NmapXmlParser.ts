import { SeverityLevel } from '../../domain/value-objects/SeverityLevel';
import { PortInfo } from '../../domain/entities/PortInfo';

export interface NmapParsedPort {
    portid: number;
    protocol: 'tcp' | 'udp';
    state: 'open' | 'closed' | 'filtered';
    service: string;
    version: string;
    risk: SeverityLevel;
}

export class NmapXmlParser {
    /**
     * Parseia a saída XML do Nmap extraindo as portas e serviços.
     * Implementação baseada em Regex para evitar dependências pesadas de XML.
     */
    static parsePorts(xml: string): NmapParsedPort[] {
        const ports: NmapParsedPort[] = [];

        // Regex para capturar blocos <port ...>...</port>
        const portRegex = /<port protocol="([^"]+)" portid="([^"]+)">([\s\S]*?)<\/port>/g;
        let portMatch;

        while ((portMatch = portRegex.exec(xml)) !== null) {
            const protocol = portMatch[1] as 'tcp' | 'udp';
            const portid = parseInt(portMatch[2], 10);
            const content = portMatch[3];

            // Estado da porta
            const stateMatch = /<state state="([^"]+)"/.exec(content);
            const state = (stateMatch ? stateMatch[1] : 'unknown') as 'open' | 'closed' | 'filtered';

            if (state !== 'open') continue;

            // Serviço e Versão
            const serviceMatch = /<service name="([^"]+)"/.exec(content);
            const productMatch = /product="([^"]+)"/.exec(content);
            const versionMatch = /version="([^"]+)"/.exec(content);
            const extraMatch = /extrainfo="([^"]+)"/.exec(content);

            const serviceName = serviceMatch ? serviceMatch[1] : 'unknown';
            const product = productMatch ? productMatch[1] : '';
            const versionStr = versionMatch ? versionMatch[1] : '';
            const extra = extraMatch ? extraMatch[1] : '';

            const fullVersion = [product, versionStr, extra].filter(Boolean).join(' ');

            // Determina risco básico baseado na porta/serviço
            const risk = this.determineRisk(portid, serviceName);

            ports.push({
                portid,
                protocol,
                state,
                service: serviceName,
                version: fullVersion || 'Service detected',
                risk
            });
        }

        return ports;
    }

    private static determineRisk(port: number, service: string): SeverityLevel {
        const criticalPorts = [21, 23, 445, 3389];
        const highPorts = [25, 3306, 5432, 6379, 27017];
        const mediumPorts = [22, 80, 8080];

        if (criticalPorts.includes(port)) return SeverityLevel.CRITICAL;
        if (highPorts.includes(port)) return SeverityLevel.HIGH;
        if (mediumPorts.includes(port)) return SeverityLevel.MEDIUM;

        return SeverityLevel.LOW;
    }
}
