import { INetworkScanner } from '../../domain/interfaces/INetworkScanner';
import { ScanResult } from '../../domain/entities/ScanResult';
export declare class RealNmapScanner implements INetworkScanner {
    scan(ip: string, scanMode: 'quick' | 'full'): Promise<ScanResult>;
    private generateSummary;
}
//# sourceMappingURL=RealNmapScanner.d.ts.map