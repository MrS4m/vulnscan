"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScanResult = void 0;
const uuid_1 = require("uuid");
class ScanResult {
    constructor(props) {
        this.id = props.id || (0, uuid_1.v4)();
        this.scanType = props.scanType;
        this.target = props.target;
        this.startedAt = props.startedAt;
        this.completedAt = props.completedAt || null;
        this.vulnerabilities = props.vulnerabilities;
        this.ports = props.ports || [];
        this.summary = props.summary || '';
        this.riskScore = props.riskScore || this.calculateRiskScore();
    }
    calculateRiskScore() {
        if (this.vulnerabilities.length === 0)
            return 0;
        const totalWeight = this.vulnerabilities.reduce((sum, vuln) => {
            return sum + vuln.severity.numericValue;
        }, 0);
        const maxPossible = this.vulnerabilities.length * 4; // 4 = CRITICAL
        return Math.round((totalWeight / maxPossible) * 100);
    }
    complete() {
        this.completedAt = new Date();
    }
    get criticalCount() {
        return this.vulnerabilities.filter(v => v.severity.value === 'CRITICAL').length;
    }
    get highCount() {
        return this.vulnerabilities.filter(v => v.severity.value === 'HIGH').length;
    }
    get mediumCount() {
        return this.vulnerabilities.filter(v => v.severity.value === 'MEDIUM').length;
    }
    get lowCount() {
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
exports.ScanResult = ScanResult;
//# sourceMappingURL=ScanResult.js.map