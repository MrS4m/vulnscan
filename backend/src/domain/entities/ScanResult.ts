import { v4 as uuidv4 } from 'uuid';
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

export class ScanResult {
    public readonly id: string;
    public readonly scanType: ScanType;
    public readonly target: string;
    public readonly startedAt: Date;
    public completedAt: Date | null;
    public readonly vulnerabilities: Vulnerability[];
    public readonly ports: PortInfo[];
    public readonly summary: string;
    public readonly riskScore: number;

    constructor(props: ScanResultProps) {
        this.id = props.id || uuidv4();
        this.scanType = props.scanType;
        this.target = props.target;
        this.startedAt = props.startedAt;
        this.completedAt = props.completedAt || null;
        this.vulnerabilities = props.vulnerabilities;
        this.ports = props.ports || [];
        this.summary = props.summary || '';
        this.riskScore = props.riskScore || this.calculateRiskScore();
    }

    private calculateRiskScore(): number {
        if (this.vulnerabilities.length === 0) return 0;

        const totalWeight = this.vulnerabilities.reduce((sum, vuln) => {
            return sum + vuln.severity.numericValue;
        }, 0);

        const maxPossible = this.vulnerabilities.length * 4; // 4 = CRITICAL
        return Math.round((totalWeight / maxPossible) * 100);
    }

    complete(): void {
        this.completedAt = new Date();
    }

    get criticalCount(): number {
        return this.vulnerabilities.filter(v => v.severity.value === 'CRITICAL').length;
    }

    get highCount(): number {
        return this.vulnerabilities.filter(v => v.severity.value === 'HIGH').length;
    }

    get mediumCount(): number {
        return this.vulnerabilities.filter(v => v.severity.value === 'MEDIUM').length;
    }

    get lowCount(): number {
        return this.vulnerabilities.filter(v => v.severity.value === 'LOW').length;
    }

    toJSON() {
        return {
            id: this.id,
            scanType: this.scanType,
            target: this.target,
            startedAt: this.startedAt.toISOString(),
            completedAt: this.completedAt?.toISOString() || null,
            riskScore: this.riskScore,
            summary: this.summary,
            vulnerabilitySummary: {
                total: this.vulnerabilities.length,
                critical: this.criticalCount,
                high: this.highCount,
                medium: this.mediumCount,
                low: this.lowCount,
            },
            vulnerabilities: this.vulnerabilities.map(v => v.toJSON()),
            ports: this.ports.map(p => p.toJSON()),
        };
    }
}
