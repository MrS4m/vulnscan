import { ScanResult } from '../entities/ScanResult';

export interface INetworkScanner {
    scan(ip: string, scanMode: 'quick' | 'full'): Promise<ScanResult>;
}
