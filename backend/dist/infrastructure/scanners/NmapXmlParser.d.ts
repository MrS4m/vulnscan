import { SeverityLevel } from '../../domain/value-objects/SeverityLevel';
export interface NmapParsedPort {
    portid: number;
    protocol: 'tcp' | 'udp';
    state: 'open' | 'closed' | 'filtered';
    service: string;
    version: string;
    risk: SeverityLevel;
}
export declare class NmapXmlParser {
    /**
     * Parseia a saída XML do Nmap extraindo as portas e serviços.
     * Implementação baseada em Regex para evitar dependências pesadas de XML.
     */
    static parsePorts(xml: string): NmapParsedPort[];
    private static determineRisk;
}
//# sourceMappingURL=NmapXmlParser.d.ts.map