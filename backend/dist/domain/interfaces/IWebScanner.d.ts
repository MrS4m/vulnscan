import { ScanResult } from '../entities/ScanResult';
export interface IWebScanner {
    scan(url: string, scanMode: 'quick' | 'full'): Promise<ScanResult>;
}
//# sourceMappingURL=IWebScanner.d.ts.map