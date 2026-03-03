import { INetworkScanner } from '../../domain/interfaces/INetworkScanner';
import { ScanResult } from '../../domain/entities/ScanResult';
export declare class NmapNetworkScanner implements INetworkScanner {
    private readonly knowledgeBase;
    private readonly quickPorts;
    private readonly fullPorts;
    scan(ip: string, scanMode: 'quick' | 'full'): Promise<ScanResult>;
    /**
     * Deterministically select "open" ports based on IP hash.
     * This creates consistent results for the same IP while varying across different IPs.
     */
    private determineOpenPorts;
    private hashIp;
    private generateSummary;
    private simulateDelay;
}
//# sourceMappingURL=NmapNetworkScanner.d.ts.map