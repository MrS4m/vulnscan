export interface VulnerabilityResponseDto {
    name: string;
    description: string;
    severity: string;
    category: string;
    mitigation: string;
    cveId: string | null;
    reference: string | null;
}

export interface PortResponseDto {
    port: number;
    state: string;
    protocol: string;
    service: string;
    version: string | null;
    risk: string;
    details: string | null;
}

export interface ScanResponseDto {
    id: string;
    scanType: string;
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
    vulnerabilities: VulnerabilityResponseDto[];
    ports: PortResponseDto[];
}
