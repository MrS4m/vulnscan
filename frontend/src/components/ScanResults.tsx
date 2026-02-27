import type { ScanResultDto } from '../types';
import './ScanResults.css';

interface ScanResultsProps {
    result: ScanResultDto;
}

export function ScanResults({ result }: ScanResultsProps) {
    const getRiskColor = (score: number): string => {
        if (score >= 75) return 'var(--severity-critical)';
        if (score >= 50) return 'var(--severity-high)';
        if (score >= 25) return 'var(--severity-medium)';
        return 'var(--severity-low)';
    };

    const getRiskLabel = (score: number): string => {
        if (score >= 75) return 'CRITICAL';
        if (score >= 50) return 'HIGH';
        if (score >= 25) return 'MEDIUM';
        return 'LOW';
    };

    const riskColor = getRiskColor(result.riskScore);
    const riskLabel = getRiskLabel(result.riskScore);

    const duration = result.completedAt && result.startedAt
        ? ((new Date(result.completedAt).getTime() - new Date(result.startedAt).getTime()) / 1000).toFixed(2)
        : '—';

    return (
        <section className="scan-results" aria-label="Scan results">
            {/* Summary Header */}
            <div className="results-header glass animate-fade-in-up">
                <div className="results-meta">
                    <div className="results-target">
                        <span className="meta-label">Target</span>
                        <span className="meta-value mono">{result.target}</span>
                    </div>
                    <div className="results-info-row">
                        <div className="results-info-item">
                            <span className="meta-label">Type</span>
                            <span className="scan-type-badge">{result.scanType}</span>
                        </div>
                        <div className="results-info-item">
                            <span className="meta-label">Duration</span>
                            <span className="meta-value">{duration}s</span>
                        </div>
                        <div className="results-info-item">
                            <span className="meta-label">Scan ID</span>
                            <span className="meta-value mono small">{result.id.slice(0, 8)}</span>
                        </div>
                    </div>
                </div>

                {/* Risk Score Gauge */}
                <div className="risk-gauge" aria-label={`Risk score: ${result.riskScore}%`}>
                    <svg viewBox="0 0 120 120" className="risk-gauge-svg">
                        <circle
                            cx="60" cy="60" r="50"
                            fill="none"
                            stroke="var(--border-color)"
                            strokeWidth="8"
                        />
                        <circle
                            cx="60" cy="60" r="50"
                            fill="none"
                            stroke={riskColor}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${result.riskScore * 3.14} ${314 - result.riskScore * 3.14}`}
                            transform="rotate(-90 60 60)"
                            className="risk-gauge-fill"
                        />
                    </svg>
                    <div className="risk-gauge-text">
                        <span className="risk-score" style={{ color: riskColor }}>{result.riskScore}</span>
                        <span className="risk-label" style={{ color: riskColor }}>{riskLabel}</span>
                    </div>
                </div>
            </div>

            {/* Summary Text */}
            <div className="results-summary glass animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <p>{result.summary}</p>
            </div>

            {/* Severity Counters */}
            <div className="severity-counters animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                <div className="severity-counter critical">
                    <span className="counter-value">{result.vulnerabilitySummary.critical}</span>
                    <span className="counter-label">Critical</span>
                </div>
                <div className="severity-counter high">
                    <span className="counter-value">{result.vulnerabilitySummary.high}</span>
                    <span className="counter-label">High</span>
                </div>
                <div className="severity-counter medium">
                    <span className="counter-value">{result.vulnerabilitySummary.medium}</span>
                    <span className="counter-label">Medium</span>
                </div>
                <div className="severity-counter low">
                    <span className="counter-value">{result.vulnerabilitySummary.low}</span>
                    <span className="counter-label">Low</span>
                </div>
            </div>
        </section>
    );
}
