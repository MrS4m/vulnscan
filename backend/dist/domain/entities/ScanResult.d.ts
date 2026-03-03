import { ScanType } from '../enums/ScanType';
import { Vulnerability } from './Vulnerability';
import { PortInfo } from './PortInfo';
export interface ScanResultProps {
    id?: string;
    scanType: ScanType;
    target: string;
    startedAt: Date;
    completedAt?: Date;
    vulnerabilities: Vulnerability[];
    ports?: PortInfo[];
    summary?: string;
    riskScore?: number;
}
export declare class ScanResult {
    readonly id: string;
    readonly scanType: ScanType;
    readonly target: string;
    readonly startedAt: Date;
    completedAt: Date | null;
    readonly vulnerabilities: Vulnerability[];
    readonly ports: PortInfo[];
    readonly summary: string;
    readonly riskScore: number;
    constructor(props: ScanResultProps);
    private calculateRiskScore;
    complete(): void;
    get criticalCount(): number;
    get highCount(): number;
    get mediumCount(): number;
    get lowCount(): number;
    toJSON(): {
        id: string;
        scanType: ScanType;
        target: string;
        startedAt: string;
        completedAt: string | null;
        riskScore: number;
        summary: string;
        vulnerabilitySummary: {
            total: number;
            critical: number;
            high: number;
            medium: number;
            low: number;
        };
        vulnerabilities: {
            name: string;
            description: string;
            severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
            category: string;
            mitigation: string;
            cveId: string | null;
            reference: string | null;
        }[];
        ports: {
            port: number;
            state: "open" | "closed" | "filtered";
            protocol: "tcp" | "udp";
            service: string;
            version: string | null;
            risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
            details: string | null;
        }[];
    };
}
//# sourceMappingURL=ScanResult.d.ts.map