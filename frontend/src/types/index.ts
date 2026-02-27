export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ScanMode = 'quick' | 'full';
export type ScanType = 'network' | 'web';

export interface VulnerabilityDto {
    name: string;
    description: string;
    severity: SeverityLevel;
    category: string;
    mitigation: string;
    cveId: string | null;
    reference: string | null;
}

export interface PortDto {
    port: number;
    state: 'open' | 'closed' | 'filtered';
    protocol: 'tcp' | 'udp';
    service: string;
    version: string | null;
    risk: SeverityLevel;
    details: string | null;
}

export interface VulnerabilitySummary {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
}

export interface ScanResultDto {
    id: string;
    scanType: 'NETWORK' | 'WEB';
    target: string;
    startedAt: string;
    completedAt: string | null;
    riskScore: number;
    summary: string;
    vulnerabilitySummary: VulnerabilitySummary;
    vulnerabilities: VulnerabilityDto[];
    ports: PortDto[];
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    details?: Array<{ field: string; message: string }>;
}
