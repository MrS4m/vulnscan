import { ScanResult } from '../../domain/entities/ScanResult';
import { ScanResponseDto } from '../dtos/ScanResponseDto';

export class ScanResultMapper {
    static toDto(entity: ScanResult): ScanResponseDto {
        return {
            id: entity.id,
            scanType: entity.scanType,
            target: entity.target,
            startedAt: entity.startedAt.toISOString(),
            completedAt: entity.completedAt?.toISOString() || null,
            riskScore: entity.riskScore,
            summary: entity.summary,
            vulnerabilitySummary: {
                total: entity.vulnerabilities.length,
                critical: entity.criticalCount,
                high: entity.highCount,
                medium: entity.mediumCount,
                low: entity.lowCount,
            },
            vulnerabilities: entity.vulnerabilities.map(v => ({
                name: v.name,
                description: v.description,
                severity: v.severity.value,
                category: v.category,
                mitigation: v.mitigation,
                cveId: v.cveId || null,
                reference: v.reference || null,
            })),
            ports: entity.ports.map(p => ({
                port: p.port,
                state: p.state,
                protocol: p.protocol,
                service: p.service,
                version: p.version || null,
                risk: p.risk.value,
                details: p.details || null,
            })),
        };
    }
}
